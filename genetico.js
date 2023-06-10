var Genetico = (function(){
    let poblacion = [];
    let funGenerar;
    let funMutar;
    let funCruzar;
    let funMedir;
    let npoblacion;
    let nmutar;
    let ncruzar;
    let ngenerar;
    return {
        funciones: function(_funGenerar,_funMutar,_funCruzar,_funMedir){
            funGenerar = _funGenerar;
            funMutar = _funMutar;
            funCruzar = _funCruzar;
            funMedir = _funMedir;
        },
        parametros: function(_npoblacion,_nmutar,_ncruzar,_ngenerar){
            npoblacion = _npoblacion;
            nmutar = _nmutar;
            ncruzar = _ncruzar;
            ngenerar = _ngenerar;
            if(npoblacion <= nmutar+ncruzar+ngenerar){
                return false;
            }
            return true;
        },
        genesis: function(){
            for(let i=0;i<npoblacion;i++){
                let genes = funGenerar();
                let fitness = funMedir(genes);
                poblacion.push({
                    fitness:fitness,
                    genes: genes
                });
            }
            poblacion.sort((a,b)=>{
                return (a.fitness > b.fitness)?+1:-1;
            });
        },
        evolucion: function(){
            let genes;
            let pos = npoblacion-1;
            let nsobrevivientes = npoblacion - nmutar - ncruzar - ngenerar;
            
            //mutar
            for(let i=0;i<nmutar-1;i++){
                let madre = Math.floor(Math.random()*nsobrevivientes);
                genes = funMutar(poblacion[madre].genes);
                poblacion[pos].genes = genes;
                poblacion[pos].fitness = funMedir(genes);
                pos--;
            }
            
            //cruzar
            for(let i=0;i<nmutar-1;i++){
                let madre = Math.floor(Math.random()*nsobrevivientes);
                let padre = Math.floor(Math.random()*nsobrevivientes);
                genes = funCruzar(poblacion[madre].genes,poblacion[padre].genes);
                poblacion[pos].genes = genes;
                poblacion[pos].fitness = funMedir(genes);
                pos--;
            }
            
            
            //generar
            for(let i=0;i<nmutar-1;i++){
                genes = funGenerar();
                poblacion[pos].genes = genes;
                poblacion[pos].fitness = funMedir(genes);
                pos--;
            }
            
            poblacion.sort((a,b)=>{
                return (a.fitness > b.fitness)?+1:-1;
            });
        },
        mejor: function(){
            return poblacion[0];
        }
    };
}());
