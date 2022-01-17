import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {getIsLogin} from "../../../redux-store/auth-reducer";
import s from './LoginForm.module.css'
import * as Yup from 'yup';


const LoginForm = React.memo(() => {
    let dispatch = useDispatch()

    const onLoginHandler = (email: string, password: string, rememberMe: boolean) => {
        dispatch(getIsLogin(email, password, rememberMe))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters long')
                .required('This field is required'),
        }),
        onSubmit: (values) => {
            onLoginHandler(values.email, values.password, values.rememberMe)
            formik.resetForm();
        },
    });


    return (
        <>
            <div className={s.container}>
                <h1 className={s.title}>Sign in to continue</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.formRow}>
                        <div className={s.formLine}>
                            <label htmlFor="email" className={s.formLabel}>Email</label>
                            <input
                                type="email"
                                id="email"
                                {...formik.getFieldProps('email')}
                                className={
                                    formik.errors.email && formik.touched.email ? s.inputError : s.input
                                }
                            />
                            {formik.errors.email && formik.touched.email && (
                                <span className={s.error}>{formik.errors.email}</span>
                            )}
                        </div>
                        <div className={s.formLine}>
                            <label htmlFor="password" className={s.formLabel}>Password</label>
                            <input
                                type="password"
                                id="password"
                                {...formik.getFieldProps('password')}
                                className={
                                    formik.errors.password && formik.touched.password ? s.inputError : s.input
                                }
                            />
                            {formik.errors.password && formik.touched.password && (
                                <span className={s.error}>{formik.errors.password}</span>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={s.btn}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </>

    );

})

export default LoginForm;