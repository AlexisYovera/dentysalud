import axios from "axios";
import { Field, Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { SecretariaDTO } from "./secretaria.model";

export default function ComponenteActualizarSecretaria(){
    const history = useNavigate();
    const { id }: any = useParams();
    const url = "https://localhost:44372/api-dentysalud/odontologo/";
    const [secretarias, setSecretarias] = useState<SecretariaDTO>();
    //se realiza la peticion al API por medio del axios
    const peticionesGet = async () => {
        await axios
            .get(url + id)
            .then((response) => {
                setSecretarias(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionesGet();
    }, []);

    async function ActualizarOdontologo(secretaria: SecretariaDTO) {
        try {
            await axios.put(url + id, secretaria);
            history("/secretarias");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Actualizar Secretaria</h1>
            <Formik
                initialValues={{
                    codigosecretaria: 0,
                    nombre: "",
                    apellido:"",
                    dni:"",
                    telefono:"",                  
                }}
                onSubmit={async (valores) => {
                    await ActualizarOdontologo({
                        codigosecretaria: valores.codigosecretaria,
                        nombre: valores.nombre,
                        apellido: valores.apellido,
                        dni:valores.dni,
                        telefono:valores.telefono,
                    });
                }}
                validationSchema={Yup.object({
                    nombre: Yup.string()
                        .required("Este campo es requerido")
                        .max(100, "La longitud máxima del nombre es 100 caracteres"),
                })}
            >
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">Id Secretaria:</label>
                            <Field
                                name="codigosecretaria"
                                type="text"
                                value={secretarias?.codigosecretaria}                             
                                className="form-control" readonly                        
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">Nombre:</label>
                            <Field
                                name="nombre"
                                type="text"
                                value={secretarias?.nombre}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">Apellido:</label>
                            <Field
                                name="apellido"
                                type="text"
                                value={secretarias?.apellido}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">DNI:</label>
                            <Field
                                name="dni"
                                type="text"
                                value={secretarias?.dni}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label">Telefono:</label>
                            <Field
                                name="telefono"
                                type="text"
                                value={secretarias?.telefono}
                                className="form-control"
                            />
                        </div>
                    </div>
                               
                    <div className="row mt-2">
                        <div className="col-6">
                            <button type="submit" className="btn btn-success">
                                Actualizar
                            </button>
                            <Link className="btn btn-secondary" to="/secretarias">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </Form>
            </Formik>

            <hr />
        </div>
    );
}