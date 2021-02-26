const generateStringRandom =()=>{
        return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    }

modules.export = {generateStringRandom}
