//(function() {

// Données
var pollingIntervalID = null;
var intervalPolling = 1000;
//*********************//

var nb=0;
  var jeu=true;

    function Byid(id){   
      return document.getElementById(id);  
    }

    function valuede(id){
      return Byid(id).value;
    }



    function flam(id,id2,id3){
      
        var elmtfeu=Byid(id);
        var error1=Byid("error1");
        nb=valuede(id3);
        nb=21;
        
        if(nb<=3 || isNaN(nb)){
          error1.innerHTML="Entrer un chiffre supérieur à 3";
          error1.style.color="red";
        }else{
          error1.innerHTML="";
          elmtfeu.innerHTML="";
          for (var i=0; i<nb;i++){
            insereimg(id);
          }
          ElmtJoueur=Byid("joueur");
          joueur.textContent="Le joueur 1 joue";
          joueur.style.color="#F91C80";
          jeu=true;
          insereButton(id2);
          document.getElementById("nb").value="";
        }
  
      }


    //test 2
    /*function demarrerPolling() {
      pollingIntervalID = setInterval(
        function(){insereimg(ElmtReste)},
        intervalPolling
      );
    }
  
    function arreterLePolling() {
      clearInterval(pollingIntervalID);
    }*/
    //***************************//  

    function insereimg(id){
      var elmt=Byid(id);
      var createtd=document.createElement("td");
      var i=document.createElement("IMG");
      i.setAttribute("src", "img/allumette.gif");
      i.setAttribute("alt","allumette");
      createtd.appendChild(i);
      elmt.appendChild(createtd);

      
    }

    function insereButton(idb){
      var elmt=Byid(idb);
      elmt.innerHTML="<p><button type='button' onclick='enlever(nbAllumEnlev)'>Enlever</button> <input type='text' id='nbAllumEnlev' name='nbAllumEnlev' size='5' value=''/><label> allumette(s)</label><span id='error2'></span></p><p id='reste'></p>"
    }
    

    function enlever(nb2){
      var elmtfeu=Byid("trfeu");  
      var nbAllumEnlev=parseInt(valuede("nbAllumEnlev"));
      var ElmtReste=Byid("reste");
            
      if(nbAllumEnlev>3 || nbAllumEnlev<=0 || isNaN(nbAllumEnlev)){
        error2=Byid("error2");
        error2.textContent=" Entrez un chiffre entre 0 et 3 et inférieur au nombre d\'allumette(s) restante(s)";
        error2.style.color="red";
      }else if (nbAllumEnlev>nb){
        error2.textContent=" Entrez un chiffre inférieur au nombre d\'allumette(s) restante(s) : "+nb;
        error2.style.color="red";
      }else{
        error2.textContent="";
        jeu=!jeu;
          if (jeu==true) {
            joueur.textContent="Le joueur 1 joue";
          }else{
            joueur.textContent="Le joueur 2 joue";
          }
          for (var i=nbAllumEnlev-1; i>=0;i--){
            elmtfeu.removeChild(elmtfeu.childNodes[i]);
          } 
          nb=nb-nbAllumEnlev;         
      }

      ElmtReste.textContent="Il reste "+nb+" allumette(s) à jouer.";
      document.getElementById("nbAllumEnlev").value="";

      if(nb===0){ 
        joueur.textContent="";
        jeu=!jeu;
        if (jeu==true) {
            joueur.textContent="Le joueur 2 gagne";
            joueur.style.color="#2E76FF";
          }else{
            joueur.textContent="Le joueur 1 gagne";
            joueur.style.color="#2E76FF";
          }

        error2.textContent=" ***** Le jeu est Terminé. *****";
          error2.style.color="#2E76FF";
      }
      
    }

    //setTimeout(function(){insereimg("reste")},1000);
    //setTimeout(function(){insereimg("trfeu")},1000);
    //setTimeout('Byid()',1400);
  // Interroger le serveur à intervales réguliers pour vérifier si de nouveaux commentaires ont été publiés
  //demarrerPolling();
//})();