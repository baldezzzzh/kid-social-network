import React from "react";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {getIsLogin} from "../../../redux-store/auth-reducer";
import s from './LoginForm.module.css'


const initialValues = {
    email: "",
    password: ""
};


const submitForm = (values: any) => {
    console.log(values);
};

const LoginForm = React.memo(() => {
    let dispatch = useDispatch()
    const [disabled, setDisabled] = React.useState(false)
    const validate = (values: any) => {
        let errors = {
            email: undefined
        };
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            // @ts-ignore
            errors.email = "Email is required";
            setDisabled(true)
        } else if (!regex.test(values.email)) {
            // @ts-ignore
            errors.email = "Invalid Email";
            setDisabled(true)
        }

        if (!values.password) {
            // @ts-ignore
            errors.password = "Password is required";
            setDisabled(true)
        } else if (values.password.length < 4) {
            // @ts-ignore
            errors.password = "Password too short";
            setDisabled(true)
        }


        return errors;
    };


    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                } = formik;
                const onLoginHandler = () => {
                    dispatch(getIsLogin(values.email, values.password, true))
                }

                return (
                    <div className={s.container}>
                        <h1 className={s.title}>Sign in to continue</h1>
                        <form onSubmit={handleSubmit} className={s.form}>
                            <div className={s.formRow}>
                                <div className={s.formLine}>
                                    <label htmlFor="email" className={s.formLabel}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? s.inputError : s.input
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <span className={s.error}>{errors.email}</span>
                                    )}
                                </div>
                                <div className={s.formLine}>
                                    <label htmlFor="password" className={s.formLabel}>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? s.inputError : s.input
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <span className={s.error}>{errors.password}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={!disabled ? `${s.disabledBtn} + ${s.btn}` : s.btn}
                                disabled={errors ? !disabled : disabled}
                                onClick={onLoginHandler}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
})

export default LoginForm;