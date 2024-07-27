/* core */
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Container,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap"

/* importaciones */
import Inicio from "./Inicio"
import Destacados from "./Destacados"
import BarraNavegacion from "./fragments/BarraNavegacion"

/* component: view */
function App() {
  const [menu, setMenu] = useState('inicio') // 'inicio' - 'destacados'

  // function handleChangeMenuDestacado() { }
  const handleChangeMenuDestacado = () => {
    // menu = 'destacado' //  mal*
    setMenu('destacado')
  }

  return (
    <>
        <Container>
          <Row>
            <BarraNavegacion
                setMenu={setMenu}
                handleChangeMenuDestacado={handleChangeMenuDestacado}
            />
          </Row>

          <Row className="mt-2">
            {/* condition rendering */}
            {menu === 'inicio' &&
              <>
                <Inicio />
              </>
            }
            {menu === 'destacados' &&
              <>
                <Destacados />
              </>
            }
          </Row>
        </Container>
    </>
  )
}

export default App
