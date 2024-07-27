import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table, Alert } from 'reactstrap';

const GestionTiendaMusica = () => {
    const [instrumentos, setInstrumentos] = useState([]);
    const [nuevoInstrumento, setNuevoInstrumento] = useState({ id: '', nombre: '', enStock: false, categoria: '' });
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    useEffect(() => {
        const instrumentosGuardados = JSON.parse(localStorage.getItem('instrumentos')) || [];
        setInstrumentos(instrumentosGuardados);
    }, []);

    const guardarEnLocalStorage = (instrumentosActualizados) => {
        localStorage.setItem('instrumentos', JSON.stringify(instrumentosActualizados));
        setInstrumentos(instrumentosActualizados);
    };

    const manejarCambioEntrada = (e) => {
        const { name, value, type, checked } = e.target;
        setNuevoInstrumento(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'id' ? Math.max(0, parseInt(value) || 0) : value
        }));
    };

    const agregarInstrumento = () => {
        if (instrumentos.some(instrumento => instrumento.id === nuevoInstrumento.id)) {
            setMensaje({ texto: 'Error: El ID ya existe', tipo: 'danger' });
            return;
        }
        const instrumentosActualizados = [...instrumentos, nuevoInstrumento];
        guardarEnLocalStorage(instrumentosActualizados);
        setNuevoInstrumento({ id: '', nombre: '', enStock: false, categoria: '' });
        setMensaje({ texto: 'Instrumento añadido exitosamente', tipo: 'success' });
    };

    const editarInstrumento = (index) => {
        const instrumentosActualizados = [...instrumentos];
        instrumentosActualizados[index] = nuevoInstrumento;
        guardarEnLocalStorage(instrumentosActualizados);
        setNuevoInstrumento({ id: '', nombre: '', enStock: false, categoria: '' });
        setMensaje({ texto: 'Instrumento editado exitosamente', tipo: 'success' });
    };

    const eliminarInstrumento = (id) => {
        const instrumentosActualizados = instrumentos.filter(instrumento => instrumento.id !== id);
        guardarEnLocalStorage(instrumentosActualizados);
        setMensaje({ texto: 'Instrumento eliminado exitosamente', tipo: 'success' });
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Gestión de Instrumentos Musicales</h1>
            <Form className="bg-light p-4 rounded shadow-sm">
                <Row className="align-items-end">
                    <Col md={3}>
                        <FormGroup>
                            <Label for="id">ID</Label>
                            <Input type="number" name="id" id="id" value={nuevoInstrumento.id} onChange={manejarCambioEntrada} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input type="text" name="nombre" id="nombre" value={nuevoInstrumento.nombre} onChange={manejarCambioEntrada} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup className="d-flex align-items-center mb-0">
                            <Input
                                type="checkbox"
                                name="enStock"
                                id="enStock"
                                checked={nuevoInstrumento.enStock}
                                onChange={manejarCambioEntrada}
                                className="form-check-input me-2"
                            />
                            <Label for="enStock" className="form-check-label mb-0">En Stock</Label>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="categoria">Categoría</Label>
                            <Input type="text" name="categoria" id="categoria" value={nuevoInstrumento.categoria} onChange={manejarCambioEntrada} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" onClick={agregarInstrumento} className="mt-3">Añadir Instrumento</Button>
            </Form>
            {mensaje.texto && <Alert color={mensaje.tipo} className="mt-3">{mensaje.texto}</Alert>}
            <Table hover responsive className="mt-4">
                <thead className="bg-light">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>En Stock</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {instrumentos.map((instrumento, index) => (
                    <tr key={instrumento.id}>
                        <td>{instrumento.id}</td>
                        <td>{instrumento.nombre}</td>
                        <td>{instrumento.enStock ? 'Sí' : 'No'}</td>
                        <td>{instrumento.categoria}</td>
                        <td>
                            <Button color="info" size="sm" className="me-2" onClick={() => setNuevoInstrumento(instrumento)}>Editar</Button>
                            <Button color="danger" size="sm" onClick={() => eliminarInstrumento(instrumento.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default GestionTiendaMusica;