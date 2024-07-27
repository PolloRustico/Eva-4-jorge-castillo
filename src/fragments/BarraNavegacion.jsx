/* core */
import React, { useState } from "react"
import {
    Col,
    Nav,
    NavItem,
    NavLink
} from "reactstrap"

/* view: component */
function BarraNavegacion({ setMenu, handleChangeMenuDestacado }) {

    return (
        <>
            <Col md="12" xs="12">
                <Nav pills className="mt-2">
                    <NavItem>
                        {/* cambio de valor de estado por función anónima */}
                        <NavLink href="#" onClick={() => setMenu('inicio')}>
                            Inicio
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        {/* cambio de valor de estado por función normal */}
                        <NavLink href="#" onClick={handleChangeMenuDestacado}>
                            Destacados
                        </NavLink>
                    </NavItem>
                </Nav>
            </Col>
        </>
    )
}

/* exportación */
export default BarraNavegacion