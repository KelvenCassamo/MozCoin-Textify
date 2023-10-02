

String.prototype.extenso = function() {
 
    var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "Catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
    ];

    String.prototype.resolvePossiveisFalhas = function (){
       var resultado = this;
      resultado =  resultado.replace("um mil", "mil");

        return resultado;
    }

    return new Promise((resolve, reject) => {

        var xhttp = new XMLHttpRequest();
        xhttp.onload =  ()=>{
            //INICIO DO ONLOAD
        var response = JSON.parse(xhttp.responseText);
         var author = response.author;
         /*
         ...
          author.name;
          author.tel;
          author.email;
          author.github;
          ...
         */
        
        response = response.data;
        
        
          //Separar a parte inteira da parte fracionária.
    var n = parseFloat(this.replace(",", `${response.separadorDecimal}`), 10).toFixed(2).toString().split(`${response.separadorDecimal}`);
        
       //Pegar a parte inteira.
        var meticais = parseInt(n[0], 10);
        //Pegar a parte fracionaria
        var centavos = parseInt(n[1], 10);
    
        //Funcao para repressentar o valor
        function extensoValor(valor) {

            var a, n, v, i, n = valor.toString().split("."), e = ` ${response.conjuncao} `, $ = `${response.unitsingular}`, d = `${response.subunitsingular}`, sl;
            var r = [], s = [], t = "";
            
            //A variavel "n" recebeu 2 valores na qual foram separados por "." usando o metodo split. 
    
            for (var f = n.length - 1, l, j = -1; ++j <= f; s = []) {   
                
                j && (n[j] = ((`${response.separadorDecimal}` + n[j]) * 1).toFixed(2).slice(2));
               
                if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
              
                for (a = -1, l = v.length; ++a < l; t = "") {
                    if (!(i = v[a] * 1)) continue;
                    i % 100 < 20 && (t += ex[0][i % 100]) ||
                    i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
                    s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
                    ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
                }
                a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
                a && r.push(a);
            }
    
          
            return r.join(e);
        }
    
        var result = extensoValor(meticais) + " " + (meticais === 1 ? `${response.unitsingular}` : `${response.unitplural}`);
        if (centavos > 0) {
            result += ` ${response.conjuncao} ` + extensoValor(centavos) + " " + (centavos === 1 ? `${response.subunitsingular}` : `${response.subunitplural}`);
        }
    
        if(this.length < 1){
    resolve("");
        }else{
            resolve(result.resolvePossiveisFalhas());
        }
    
    //FIM do ONLOAD
        }
        xhttp.open("get", "./config.json", true);
        xhttp.send();
      


    })


 



   
}