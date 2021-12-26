import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"

import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import ModalManager from "./ModalManager"


export const Librogram = () => {
    const [modalOpen, setModal] = useState(false);

    const openModal = event => {
        event.preventDefault();
        const {
            target: {
                dataset: { modal }
            }
        } = event;
        if (modal) setModal(modal);
    };

    const closeModal = () => {
        setModal('');
    };
    return (
        <>
            <Route render={() => {
                if (localStorage.getItem("lg_user_token")) {
                    return <>
                        <Route>
                            <div className="app--shell" onClick={openModal}>
                            <NavBar />
                            <ApplicationViews />
                            <ModalManager closeFn={closeModal} modal={modalOpen} />
                            </div>
                        </Route>
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

        </>
    )
}
