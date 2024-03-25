let canvas = document.getElementById("myCanvas");
canvas.width = canvas.height = 1000; 
let ctx = canvas.getContext("2d");

rule = " p|(q^r)"; // &, |, ^, ~ (alt+4 para el no)

let getCascade = () => ({
    size:10, // divisores
    converter (p,q,r) {return eval(rule);},
    inst (table,index){
        a = [] //siempre la tabla anterior será de la anterior fila

        for(let b = 0; b < canvas.width/this.size;b++){
            if (this.converter(table.includes(b-1),table.includes(b),table.includes(b+1))){
                a.push(b)
                ctx.fillRect(b*this.size,index*this.size,this.size,this.size)
            }
        }

        return a;
    }
})

Cascade = getCascade()
firstPoint = canvas.width/(2*Cascade.size);
tab = [firstPoint];
ctx.fillRect(firstPoint*Cascade.size,0,Cascade.size,Cascade.size)
for (let i = 1; i < canvas.height/Cascade.size; i++){
    tab = Cascade.inst(tab,i)
}