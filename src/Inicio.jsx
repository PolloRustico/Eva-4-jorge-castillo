/* core */
import React, { useState } from 'react'
import {Col} from "reactstrap"
import ContenidoInicioFragment from "./fragments/ContenidoInicioFragment"

/* view: component */
function Inicio() {

    return (
        <>
            <Col md="12" xs="12">
                {/* Añadir una card pero como fragmento */}
                {/* ContenidoInicioFragment.jsx */}
                <ContenidoInicioFragment />
            </Col>
        </>
    )
}

/* exportación */
export default Inicio