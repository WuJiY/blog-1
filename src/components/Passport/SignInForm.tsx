import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import useCaptcha from '@/hooks/useCaptcha'
import useInputChangeHandler from '@/hooks/useInputChangeHandler'
import useUser from '@/hooks/useUser'
import service from '@/utils/services'

interface SignInFormProps {
  closeModal: () => void
}

/**
 * 登录表单
 */
export default function SignInForm(props: SignInFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const user = useUser()

  const captcha = useCaptcha(async (res) => {
    if (res.ret === 0) {
      setLoading(true)
      try {
        const signInRes = await service.post<{ message: string }>('/login', {
          mail: email,
          pass: password,
        })
        await user.dispatch('fetch')
        toast.success(signInRes.message)
        setLoading(false)
        props.closeModal()
      } catch {
        setLoading(false)
      }
    }
  })

  const handleInputChange = useInputChangeHandler({
    email: setEmail,
    password: setPassword,
  })

  const handleSignIn = () => {
    captcha.show()
  }

  return (
    <Form onSubmit={handleSignIn}>
      <Form.Field>
        <label htmlFor="sign-in-email">邮箱</label>
        <input
          id="sign-in-email"
          name="email"
          type="email"
          maxLength={40}
          autoComplete="email"
          required
          onChange={handleInputChange}
        ></input>
      </Form.Field>
      <Form.Field>
        <label htmlFor="sign-in-password">密码</label>
        <input
          id="sign-in-password"
          name="password"
          type="password"
          maxLength={20}
          required
          onChange={handleInputChange}
        ></input>
      </Form.Field>
      <Form.Field>
        <Button color="teal" fluid loading={loading}>
          登录
        </Button>
      </Form.Field>
    </Form>
  )
}
