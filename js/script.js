// Event handling
/*document.addEventListener("DOMContentLoaded",
  function (event) {
    function sayHello () {

    var hedef = document.getElementById("kalorihedef").value;
    var karbon = document.getElementById("carbonyuzde").value;
    //document.querySelector("carbon").textContent=(hedef*karbon)/400;

var title = document.querySelector("#carbon") .textContent;
     title = "30";
        document.textContent = title;
  }

  }
);
   var hedef = document.getElementById("kalorihedef").value;
    var karbon = document.getElementById("carbonyuzde").value;
   // document.querySelector("carbon").textContent=(hedef*karbon)/400;
    console.log(karbon);
    console.log(hedef);
   // var title = document.querySelector("#carbon") .textContent;
     title = "30";
        document.textContent = title;
       // document.getElementById("carbon")=(hedef*karbon)/400;*/

      // var deben="";
      var hedef = document.getElementById("kalorihedef").value;
      var message="<p>* Sonuçun doğru çıkması için değerlerin toplamının 100 olması gerekmektedir</p>";
       

        function islemkarbon () {          
         var karbon = document.getElementById("carbonyuzde").value;
         // calc= document.getElementById("carbonmik").value;
         calc=(hedef*karbon)/400;
         document.getElementById("carbonmik").value=calc.toFixed(3);
        // document.getElementById("warning").innerHTML=message;
        toplam();
        }
           function islempro () {
         var pro = document.getElementById("proteinyuzde").value;
         // calc= document.getElementById("protein1").value;
         calc=(hedef*pro)/400;
         document.getElementById("protein1").value=calc.toFixed(3);
         toplam();
        }
           function islemyag () {
         var yag = document.getElementById("yagyuzde").value;
          //calc= document.getElementById("yag1").value;
         calc=(hedef*yag)/900;
         document.getElementById("yag1").value=calc.toFixed(3);
         toplam();
        }
         
      //console.log(toplam);

      function toplam()
      {
        karbon = document.getElementById("carbonyuzde").value;
         pro = document.getElementById("proteinyuzde").value;
         yag = document.getElementById("yagyuzde").value;

         var toplam=parseInt(karbon)+parseInt(pro)+parseInt(yag);
        if(toplam !== 100){
        console.log(toplam);
            document.getElementById("warning").innerHTML=message;
        }
        else{
          console.log("else");
          document.getElementById("warning").innerHTML="<p></p>";
        }
      }




         var karbon = document.getElementById("carbonmik").value;
        // var  pro = document.getElementById("protein1").value;
        // var  yag = document.getElementById("yag1").value;

         var kk = document.getElementById("kk").value;
        /* var kp = document.getElementById("kp").value;
         var ky = document.getElementById("ky").value;
         var saok = document.getElementById("saok").value;
         var saop = document.getElementById("saop").value;
         var saoy = document.getElementById("saoy").value;
         var ok = document.getElementById("ok").value;
         var op = document.getElementById("op").value;
         var oy = document.getElementById("oy").value;
         var oaok = document.getElementById("oaok").value;
         var oap = document.getElementById("oap").value;
         var oaoy = document.getElementById("oaoy").value;
         var ak = document.getElementById("ak").value;
         var ap = document.getElementById("ap").value;
         var ay = document.getElementById("ay").value;
         var aaok = document.getElementById("aaok").value;
         var aop = document.getElementById("aop").value;
         var aaoy = document.getElementById("aaoy").value;*/

       function islemkk() {

      
         
         calc=(karbon*kk )/100;
        /* calc=(karbon*saok )/100;
         calc=(karbon*ok )/100;
         calc=(karbon*oaok )/100;
         calc=(karbon*aaok )/100;
         calc=(karbon*ak )/100;
         calc=(pro*kp )/100;
         calc=(pro*saop )/100;
         calc=(pro*op )/100;
         calc=(pro*oap )/100;
         calc=(pro*ap )/100;
         calc=(pro*kaopk )/100;
         calc=(yag*ky )/100;
         calc=(yag*saoy )/100;
         calc=(yag*oy )/100;
         calc=(yag*oaoy )/100;
         calc=(yag*ay )/100;
         calc=(yag*aaoy )/100;*/

         document.getElementById("kkmik").value=calc.toFixed(3);
       /*  document.getElementById("kpmik").value=calc.toFixed(3);
         document.getElementById("kymik").value=calc.toFixed(3);
         document.getElementById("saokmik").value=calc.toFixed(3);
         document.getElementById("saop").value=calc.toFixed(3);
         document.getElementById("saoy").value=calc.toFixed(3);
         document.getElementById("ok").value=calc.toFixed(3);
         document.getElementById("op").value=calc.toFixed(3);
         document.getElementById("oy").value=calc.toFixed(3);
         document.getElementById("oaok").value=calc.toFixed(3);
         document.getElementById("aop").value=calc.toFixed(3);
         document.getElementById("oaoy").value=calc.toFixed(3);
         document.getElementById("ak").value=calc.toFixed(3);
         document.getElementById("ap").value=calc.toFixed(3);
         document.getElementById("ay").value=calc.toFixed(3);
         document.getElementById("aaok").value=calc.toFixed(3);
         document.getElementById("aop").value=calc.toFixed(3);
         document.getElementById("aaoy").value=calc.toFixed(3);*/
         //toplamyemek();
        }

           /*   function toplamyemek()
      {
         var kk = document.getElementById("kk").value;
         var kp = document.getElementById("kp").value;
         var ky = document.getElementById("ky").value;
         var saok = document.getElementById("saok").value;
         var saop = document.getElementById("saop").value;
         var saoy = document.getElementById("saoy").value;
         var ok = document.getElementById("ok").value;
         var op = document.getElementById("op").value;
         var oy = document.getElementById("oy").value;
         var oaok = document.getElementById("oaok").value;
         var oap = document.getElementById("oap").value;
         var oaoy = document.getElementById("oaoy").value;
         var ak = document.getElementById("ak").value;
         var ap = document.getElementById("ap").value;
         var ay = document.getElementById("ay").value;
         var aaok = document.getElementById("aaok").value;
         var aop = document.getElementById("aop").value;
         var aaoy = document.getElementById("aaoy").value;

         var toplam=parseInt(kk)+parseInt(saok)+parseInt(ok)+parseInt(oaok)+parseInt(ak)
         +parseInt(aaok);
        var flag=0;
        if(toplam !== 100){
          var message1="<p>* Sonuçun doğru çıkması için (Karbon) değerlerin toplamının 100 olması gerekmektedir</p>";
        console.log(toplam);
            document.getElementById("warning").innerHTML=message;
            flag=1;
        }
        else if(toplam === 100) flag=0;

       var toplam1=parseInt(kp)+parseInt(saop)+parseInt(op)+parseInt(oaop)+parseInt(ak)
         +parseInt(aop);
        
        if(toplam1 !== 100){
          var message1="<p>* Sonuçun doğru çıkması için (Protein) değerlerin toplamının 100 olması gerekmektedir</p>";
        console.log(toplam1);
            document.getElementById("warning").innerHTML=message;
            flag=1;
        }

         else if(toplam1 === 100) flag=0;
           var toplam2=parseInt(ky)+parseInt(saoy)+parseInt(oy)+parseInt(oaoy)+parseInt(ay)
         +parseInt(aaoy);
        
        if(toplam2 !== 100){
          var message1="<p>* Sonuçun doğru çıkması için (Yağ) değerlerin toplamının 100 olması gerekmektedir</p>";
        console.log(toplam2);
            document.getElementById("warning").innerHTML=message;
            flag=1;
        }
        else if(toplam2 === 100) flag=0;

        if(flag===1){

          document.getElementById("warnings").innerHTML="<p></p>";
        }

      }*/




document.addEventListener("DOMContentLoaded",
  function (event) {
    var karbonhidrat = document.querySelectorAll(".karbonhidrat"); 
    var  pro = document.getElementById("protein1").value;
    var carbonmik = document.getElementById("carbonmik").value;
    var  yagmik = document.getElementById("yag1").value;

    //console.log(karbonhidrat[0]);   

var kk = document.getElementById("kk").value;
var saok = document.getElementById("saok").value;
var ok = document.getElementById("ok").value;
var oaok = document.getElementById("oaok").value;
var ak = document.getElementById("ak").value;
var aaok = document.getElementById("aaok").value;

    
    karbonhidrat[0].addEventListener("change",function()
    {
      //karbonhidrat
        console.log(this.value);
      // document.getElementById("kkmik").value=calc.toFixed(3);
      calc=(hedef*this.value)/400;
      console.log(calc);
      document.getElementById("carbonmik").value=(calc).toFixed(3);

      document.getElementById("kkmik").value=((calc*kk)/100).toFixed(3);
      
      
      document.getElementById("saokmik").value=((calc*saok)/100).toFixed(3);
      
      
      document.getElementById("okmik").value=((calc*ok)/100).toFixed(3);
      
      
      document.getElementById("oaokmik").value=((calc*oaok)/100).toFixed(3);
      
      
      document.getElementById("akmik").value=((calc*ak)/100).toFixed(3);
      
      
      document.getElementById("aaopmik").value=((calc*aaok)/100).toFixed(3);

      err();
    });
    karbonhidrat[1].addEventListener("change",function()
    {
      //kahvaltı karbon
     // console.log(this.value);
      document.getElementById("kkmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });

  karbonhidrat[2].addEventListener("change",function()
    {
      //kahvaltı ara karbon
      //console.log(this.value);
      document.getElementById("saokmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });
    karbonhidrat[3].addEventListener("change",function()
    {
      //öğlen  karbon
      console.log(this.value);
      document.getElementById("okmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });
      karbonhidrat[4].addEventListener("change",function()
    {
      //öğlen ara karbon
      console.log(this.value);
      document.getElementById("oaokmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });
       karbonhidrat[5].addEventListener("change",function()
    {
      //akşam karbon
      console.log(this.value);
      document.getElementById("akmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });
          karbonhidrat[6].addEventListener("change",function()
    {
      //akşam ara karbon
      console.log(this.value);
      document.getElementById("aaokmik").value=((carbonmik*this.value)/100).toFixed(3);
      err();
    });


var kp = document.getElementById("kp").value;
var saop = document.getElementById("saop").value;
var op = document.getElementById("op").value;
var oaok = document.getElementById("oaop").value;
var ap = document.getElementById("ap").value;
var aaop = document.getElementById("aaop").value;

var protein = document.querySelectorAll(".protein");

 protein[0].addEventListener("change",function()
    {
      calc=(hedef*this.value)/400;
      //console.log(calc);
      document.getElementById("protein1").value=(calc).toFixed(3);

      document.getElementById("kpmik").value=((calc*kp)/100).toFixed(3);
      
      
      document.getElementById("saopmik").value=((calc*saop)/100).toFixed(3);
      
      
      document.getElementById("opmik").value=((calc*op)/100).toFixed(3);
      
      
      document.getElementById("oaopmik").value=((calc*oaop)/100).toFixed(3);
      
      
      document.getElementById("apmik").value=((calc*ap)/100).toFixed(3);
      
      
      document.getElementById("aaopmik").value=((calc*aaop)/100).toFixed(3);

  err();
     });

  
     protein[1].addEventListener("change",function()
    {
      //kahvaltı karbon
      document.getElementById("kpmik").value=((pro*this.value)/kp).toFixed(3);
      err();
    });

  protein[2].addEventListener("change",function()
    {
      //kahvaltı ara karbon
      console.log(this.value + " 2");
      document.getElementById("saopmik").value=((pro*this.value)/saop).toFixed(3);
      err();
    });
    protein[3].addEventListener("change",function()
    {
      //öğlen  karbon
      console.log(this.value);
      document.getElementById("opmik").value=((pro*this.value)/op).toFixed(3);
      err();
    });
      protein[4].addEventListener("change",function()
    {
      //öğlen ara karbon
      console.log(this.value);
      document.getElementById("oaopmik").value=((pro*this.value)/ap).toFixed(3);
      err();
    });
       protein[5].addEventListener("change",function()
    {
      //akşam karbon
      console.log(this.value);
      document.getElementById("apmik").value=((pro*this.value)/aaop).toFixed(3);
      err();
    });
          protein[6].addEventListener("change",function()
    {
      //akşam ara karbon
      console.log(this.value);
      document.getElementById("aaopmik").value=((pro*this.value)/100).toFixed(3);
      err();
    });



    var ky = document.getElementById("ky").value;
    var saoy = document.getElementById("saoy").value;
    var oy = document.getElementById("oy").value;
    var oaoy = document.getElementById("oaoy").value;
    var ay = document.getElementById("ay").value;
    var aaoy = document.getElementById("aaoy").value;


var yag = document.querySelectorAll(".yag");

 yag[0].addEventListener("change",function()
    {
      calc=(hedef*this.value)/900;
      console.log(this.value);
      document.getElementById("yag1").value=(calc).toFixed(3);
      
      document.getElementById("kymik").value=((calc*ky)/100).toFixed(3);
      
      
      document.getElementById("saoymik").value=((calc*saoy)/100).toFixed(3);
      
      
      document.getElementById("oymik").value=((calc*oy)/100).toFixed(3);
      
     
      document.getElementById("oaoymik").value=((calc*oaoy)/100).toFixed(3);
      
   
      document.getElementById("aymik").value=((calc*ay)/100).toFixed(3);
      
      
      document.getElementById("aaoymik").value=((calc*aaoy)/100).toFixed(3);
      err();

     });

  
     yag[1].addEventListener("change",function()
    {
      //kahvaltı 
      console.log(this.value+" 1");
      document.getElementById("kymik").value=((yagmik*this.value)/100).toFixed(3);
      err();
    });

  yag[2].addEventListener("change",function()
    {
      //kahvaltı ara 
      console.log(this.value + " 2");
      document.getElementById("saoymik").value=((yagmik*this.value)/100).toFixed(3);
      err();
    });
    yag[3].addEventListener("change",function()
    {
      //öğlen  
      console.log(this.value);
      document.getElementById("oymik").value=((yagmikyagmik*this.value)/100).toFixed(3);
      err();
    });
      yag[4].addEventListener("change",function()
    {
      //öğlen ara 
      console.log(this.value);
      document.getElementById("oaoymik").value=((yagmik*this.value)/100).toFixed(3);
      err();
    });
       yag[5].addEventListener("change",function()
    {
      //akşam 
      console.log(this.value);
      document.getElementById("aymik").value=((yagmik*this.value)/100).toFixed(3);
      err();
    });
          yag[6].addEventListener("change",function()
    {
      //akşam ara 
      console.log(this.value);
      document.getElementById("aaoymik").value=((yagmik*this.value)/100).toFixed(3);
      err();
    });




function err()
{

      proerr = document.getElementById("proteinyuzde").value;
     carbonmikerr = document.getElementById("carbonyuzde").value;
      yagmikerr = document.getElementById("yagyuzde").value;
     kkerr = document.getElementById("kk").value;
     saokerr = document.getElementById("saok").value;
     okerr = document.getElementById("ok").value;
     oaokerr = document.getElementById("oaok").value;
     akerr = document.getElementById("ak").value;
     aaokerr = document.getElementById("aaok").value;
     kperr = document.getElementById("kp").value;
     saoperr = document.getElementById("saop").value;
     operr = document.getElementById("op").value;
     oaoperr = document.getElementById("oaop").value;
     aperr = document.getElementById("ap").value;
     aaoperr = document.getElementById("aaop").value;
     kyerr = document.getElementById("ky").value;
     saoyerr = document.getElementById("saoy").value;
     oyerr = document.getElementById("oy").value;
     oaoyerr = document.getElementById("oaoy").value;
     ayerr = document.getElementById("ay").value;
     aaoyerr = document.getElementById("aaoy").value;


  var toplamlar=parseInt(carbonmikerr)+parseInt(proerr)+parseInt(yagmikerr);
  //console.log(pro);
        if(toplamlar !== 100){
        console.log("toplam="+toplamlar);
            document.getElementById("warning").innerHTML=message;
        }
        else{
          console.log("else");
          document.getElementById("warning").innerHTML="<p></p>";
        }
        

        var topkar= parseInt(kkerr)+parseInt(saokerr)+parseInt(okerr)+parseInt(oaokerr)+parseInt(akerr)+parseInt(aaokerr);
        var toppro= parseInt(kperr)+parseInt(saoperr)+parseInt(operr)+parseInt(oaoperr)+parseInt(aperr)+parseInt(aaoperr);
        var topyag= parseInt(kyerr)+parseInt(saoyerr)+parseInt(oyerr)+parseInt(oaoyerr)+parseInt(ayerr)+parseInt(aaoyerr);
        //console.log(topkar);
        if( topkar !== 100 )
        {
          document.getElementById("warnings").innerHTML="<p>* Sonuçun doğru çıkması için değerlerin(Karbonhidrat) toplamının 100 olması gerekmektedir</p>";
        }

        
       else if( toppro !== 100 )
        {
          document.getElementById("warnings").innerHTML="<p>* Sonuçun doğru çıkması için değerlerin(Protein) toplamının 100 olması gerekmektedir</p>";
        }

        
        else if( topyag !== 100 )
        {
          document.getElementById("warnings").innerHTML="<p>* Sonuçun doğru çıkması için değerlerin(Yag) toplamının 100 olması gerekmektedir</p>";
        }
        else {
          console.log("else");
          document.getElementById("warnings").innerHTML="<p></p>";
        }
}

  });



