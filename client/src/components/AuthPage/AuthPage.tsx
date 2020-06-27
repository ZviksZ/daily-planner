import React, {useState} from 'react';
import {connect}         from "react-redux";
import {login, register} from "../../redux/authReducer";
import styles            from './AuthPage.module.scss';


const AuthPage = ({login, register, error, message, loading}: any) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const registerHandler = async () => {
        register(form.email, form.password)
    }
    const loginHandler = async () => {
        login(form.email, form.password)
    }

    return (
        <div className={styles.auth}>
            {error && <div className={styles.error}>{error}</div>}
            {message && <div className={`${styles.error} ${styles.success}`}>{message}</div>}
            <h1>Daily planner</h1>
            <div className={styles.authForm}>
                <div className={styles.authFormFields}>
                    <h3 className={styles.authFormTitle}>Авторизация</h3>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Введите email"
                            onChange={changeHandler}
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            placeholder="Введите пароль"
                            onChange={changeHandler}
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                        />
                    </div>
                </div>
                <div className={styles.authFormBtns}>
                    <button
                        className={styles.btn}
                        onClick={loginHandler}
                    >
                        Войти
                    </button>
                    <button
                        className={styles.btn}
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state: any) => {
    return {
        error: state.authPage.error,
        message: state.authPage.message,
        loading: state.common.loading
    }
}

export default connect(mapStateToProps, {login, register})(AuthPage)
