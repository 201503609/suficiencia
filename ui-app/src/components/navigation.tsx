import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/"><i className="fab fa-docker"></i> SUFICIENCIA </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/grafica"><i className="fab fa-ubuntu"></i> SERVER</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/covid"><i className="fas fa-lungs-virus"></i> CONSULTAS</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navigation;