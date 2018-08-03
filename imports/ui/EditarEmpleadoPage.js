import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import { disconnect } from 'cluster';
import PropTypes from 'prop-types';
import { Router, Route, browserHistory } from 'react-router';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import InputMask from 'react-input-mask';

import './../client/styles/editEmpleado';

let usuarios = [
    {
        name: 'Abe'
    },
    {
        name: 'Adam'
    },
    {
        name: 'Allan'
    },
    {
        name: 'Bob'
    },
    {
        name: 'Cathy'
    }
]

export default class editarEmpleadoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    searchEmployeeSubmit(e) {
        e.preventDefault();
        console.log("Search Employee");
        let parameters = this.refs.valueToQuery.value;
        const usersFound = Meteor.call('query.User', parameters);
        console.log(usersFound);
        this.setState({ usersFound });
    }

    onAgregar() {
       console.log("Agrego");
       var modal = document.getElementById('simpleModal');
       modal.style.display = 'block';
       const user = Meteor.users.findOne({_id:plate.userId});
       console.log(user);
    }

    onModificar() {
        console.log("Modifico");
        var modal = document.getElementById('simpleModal2');
        modal.style.display = 'block';
        this.pasarInfo();
    }

    onEliminar() {
        console.log("Elimino");
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'block';
    }

    closeAgregar() {
        var modal = document.getElementById('simpleModal');
        modal.style.display = 'none';
    }



    filterNames() {
        //Get value of input
        let filterValue = document.getElementById('filterInput').value.toUpperCase();

        // console.log(filterValue);

        //Get names ul
        let ul = document.getElementById('names');

        // Get li from Ul
        //grab things by classes  and puts them in an array
        let li = ul.querySelectorAll('li.collection-item');
        // console.log(li);
        //Loop through collection-item lis
        for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName('a')[0]; //get current link
            // console.log(a);
            // if matched
            if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
    }

    componentDidMount() {
        this.usersTracker = Tracker.autorun(() => {
            Meteor.subscribe('users');
            const users = Meteor.users.find().fetch();
            this.setState({ users });
        });
    }

    componentWillUnmount() {
        this.usersTracker.stop();
      }




    render() {
        console.log(this.state.users);
        return (
            <div className="EditarEmpleado">
                <div className="containerPrincipal">
                    <div className="Buttons">
                        <button className="botonAgregar" onClick={this.onAgregar.bind(this)}>Agregar Empleado</button>
                        <button className="botonModificar" onClick={this.onModificar.bind(this)}>Modificar Empleado</button>
                        <button className="botonEliminar" onClick={this.onEliminar.bind(this)}>Eliminar Empleado</button>
                    </div>



                    <div className="searchBarDiv">
                        {/* <h3>Empleados</h3>
                        <input className="searchBar" placeholder="Nombre Empleado" ref="valueToQuery" type="search" />
                        <button className = "botonSearch" onClick={this.searchEmployeeSubmit.bind(this)}>Buscar</button> */}
                        <input type="text" id="filterInput" onKeyUp={this.filterNames.bind(this)} placeholder="Buscar Empleado..." />
                        <ul id="names" className="collection with-header">
                            {/* <li className="collection-header">
                                <h5>A</h5>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Abe</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Adam</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Alan</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Anna</a>
                            </li>

                            <li className="collection-header">
                                <h5>B</h5>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Beth</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Bill</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Bob</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Brad</a>
                            </li>

                            <li className="collection-header">
                                <h5>C</h5>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Carry</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Cathy</a>
                            </li>
                            <li className="collection-item">
                                <a href="#" className="hrefNombre">Courtney</a>
                            </li> */}
                            {renderUser(this.state.users)}

                        </ul>
                    </div>




                    {/*Modal*/}
                    <div id="simpleModal" className="modal">
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header">
                                <div className="modal-header-Btn">
                                    <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
                                </div>
                                <div className="modal-header-Name">
                                    <h2>Agregar Empleado</h2>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <form className="agregarEmpleadoFormModal">
                                    <div >
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>Email</label>
                                                    <input id = "correo" ref="email" type="email" placeholder='Enter Email' maxLength='140' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>Password</label>
                                                    <input ref="password" type="password" placeholder='Enter Password' />
                                                </p>
                                            </div>
                                            <div className="box2">
                                                <p>
                                                    <label>Confirm Password</label>
                                                    <input ref="confirmPassword" type="password" placeholder='Confirm Password' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>First Name</label>
                                                    <input ref="firstName" type="text" placeholder='Enter First Name' maxLength='140' />
                                                </p>
                                            </div>
                                            <div className="box2">
                                                <p>
                                                    <label>Last Name</label>
                                                    <input ref="lastName" type="text" placeholder='Enter Last Name' maxLength='140' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>Phone Number</label>
                                                    <InputMask id = "numero" mask="9999-9999" ref="phoneNumber" placeholder='Enter Phone Number' />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container1">
                                            <div className="box1">
                                                <p>
                                                    <label>Address</label>
                                                    <textarea ref="address" rows="5" placeholder='Enter Address' maxLength='140'></textarea>
                                                </p>
                                            </div>
                                        </div>

                                        <p>
                                            <button className="confirmarAdd" >Confirmar</button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                            {/* Footer */}
                            <div className="modal-footer"></div>

                            {/*Modal*/}
                    <div id="simpleModal2" className="modal">
                        <div className="modal-content">

                            {/* Header */}
                            <div className="modal-header">
                                <div className="modal-header-Btn">
                                    <span className="closeBtn" onClick={this.closeAgregar.bind(this)}>&times;</span>
                                </div>
                                <div className="modal-header-Name">
                                    <h2>Modificar Empleado</h2>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="modal-body">
                                <form  className="agregarEmpleadoFormModal">
                                    <div >
                                        <div className = "container1">
                                            <div className = "box1">
                                                <p>
                                                    <input className="searchBar" placeholder="Nombre Empleado" ref="srch" type="search" />
                                                    <button className = "botonSearch" onClick={this.searchEmployeeSubmit.bind(this)}>Buscar</button>
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p>
                                            <button className = "confirmarAdd" >Confirmar</button>
                                        </p>
                                    </div>       
                                </form>
                            </div>
                            {/* Footer */}
                            <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

}

const renderUser = (users) => {
    return users.map((user) => {
        return (
            <li className="collection-item" key={user._id}>
                <a href="#"  className="hrefNombre">{user.profile.firstName}</a>
            </li>
        )
    });
}
