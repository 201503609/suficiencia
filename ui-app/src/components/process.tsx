import React, {useEffect} from 'react';

const Process = ({procs} : any) => {
    useEffect(() => {
        //console.log('procs',procs);
        console.log('procs');
    });

    function GetProcessInfo(proc: any, width: number = 0){
        return (
            <div className="row" style={{width:   `${100 - width}%`, marginLeft:   `${width}%`, color: "white", backgroundColor: `rgb(${101 - width*10},${137 - width * 10},${178 - width*10})` }}>
                <div className="col-5">{proc.estado}</div>
                <div className="col-2">{proc.pid}</div>
                <div className="col-2">{proc.proceso}</div>
                <div className="col-3">{proc.uid}</div>
            </div>

        );
    }

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>Procesos</h1>
            <div className="row" style={{backgroundColor: "#80A7D0", color: "white"}}>
                <div className="col-5">PROCESO</div>
                <div className="col-2">PID</div>
                <div className="col-2">PID DEL PADRE</div>
                <div className="col-3">ESTADO</div>
            </div>
            {
                procs.map((proc: any) => {
                    return (
                        GetProcessInfo(proc)
                    );
                })
            }
        </div>
    );
};

export default Process;