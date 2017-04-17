<?php 

$kilo = $_GET['kilo'];
$boy = $_GET['boy']; 
$cinsiyet = $_GET['cinsiyet']; 
$dtarih = $_GET['yas'];
$kalp = $_GET['kalp'];
$bel = $_GET['bel'];
$aktivite = $_GET['aktivite'];

$aktivite=1.375;

$BMI=0;
$REE=0;
$yas=0;
$BEE=0;
$idealk=0;

function yas_hesap ($tarih)
{
	$tarihhold=explode(".", $tarih);
	//echo $tarih;
	$g=$tarihhold[0];
	$a=$tarihhold[1];
	$y=$tarihhold[2];
	$bugun=date('d');
	$buay=date('m');
	$buyil=date('y');
	$buyil+=2000;
	if($a < $buay)
	{

		return $buyil-$y;
	}
	elseif ($a> $buay )
	 {
		return $buyil-$y+1;
	}
	elseif ($a == $buay)
	 {
		if ($bugun<=$g)
		 {
			return $buyil-$y+1;
		}
		else
		 {
			return $buyil-$y;
		}
	 }
	 

}

function boy_hesap($b)
{
	$b/=100;
	return $b*$b;
}
function yuzde_hesap ($yuzde,$gunluk)
{

	return ($gunluk*$yuzde)/100;
}

if($cinsiyet == "E")
{
	$BMI=$kilo/boy_hesap($boy);
	$REE=66.5+13.75*$kilo+5*$boy-6.78*yas_hesap($dtarih);
	//$REE += $REE/10;
	$BEE+=($REE*0.1);
	$BEE+=($REE*$aktivite);
	//$BEE+=$REE;
	$idealk=(217/10)*boy_hesap($boy);
}
if($cinsiyet == "K")
{
	$BMI=$kilo/boy_hesap($boy);
	$REE=65.5+9.56*$kilo+1.85*$boy - 4.68 * yas_hesap($dtarih);
	$BEE+=($REE*0.1);
	$BEE+=($REE*$aktivite);
	$idealk=(217/10)*boy_hesap($boy);
}


$kilo_status=0;
$haftalik_kilo=0;
$ihtiyackilo=0;
if($BMI<18.5)
{
$kilo_status=0;
$haftalik_kilo=-250;
$ihtiyackilo=$idealk-$kilo;
}
elseif ($BMI <24.9) {
	
	$kilo_status=1;
	$haftalik_kilo=0;
	//echo "<br> kilonuz normal <br>";
	$ihtiyackilo=$kilo-$idealk;

	}
elseif ($BMI <29.9) {
	$kilo_status=2;
	$haftalik_kilo=250;
	$ihtiyackilo=$kilo-$idealk;
}
elseif ($BMI < 34.9) {
	$kilo_status=3;
	$haftalik_kilo=500;
	$ihtiyackilo=$kilo-$idealk;
}
elseif ($BMI < 39.9) {
	$kilo_status=4;
	$haftalik_kilo=500;
	$ihtiyackilo=$kilo-$idealk;
}
else
{
	$kilo_status=5;
	$haftalik_kilo=1000;
	$ihtiyackilo=$kilo-idealk;
}
  	$gunluk_kal=0;
	$eksi=-1;
 if($kilo_status>1)
 {
 	 $gunluk_kal=$haftalik_kilo*250/500 * $eksi;
 	 $gunluk_kal+=$BEE;
 }
 elseif ($kilo_status==1) {
 		
 		$gunluk_kal=-1*$haftalik_kilo*250/500;
 		$gunluk_kal+=$BEE;
 	 }
 else
 {
 	$gunluk_kal=$haftalik_kilo*250/500;
 	$gunluk_kal+=$BEE;
 }
 
 $karbonhidrat=50;
 $protein=20;
 $yag=30;
if($kilo_status==0){
	$kilo_status="Zayıf";
}
elseif ($kilo_status==1) {
	$kilo_status="Kilonuz Normal";
}
elseif ($kilo_status==2) {
	$kilo_status="Hafif Şişman";
}
elseif ($kilo_status==3) {
	$kilo_status="Şişman";
}
elseif ($kilo_status==4) {
	$kilo_status="Aşırı Şişman";
}
elseif ($kilo_status==5) {
	$kilo_status="Süper Şişman";
}

  $karbmik=((yuzde_hesap($karbonhidrat,$gunluk_kal))/4);
  $promik=yuzde_hesap($protein,$gunluk_kal)/4;
  $yagmik=yuzde_hesap($yag,$gunluk_kal)/9;
  $karbmik= number_format($karbmik,3,".","");
  $promik= number_format($promik,3,".","");
  $yagmik= number_format($yagmik,3,".","");
  $idealk= number_format($idealk,3,".","");
  $BMI= number_format($BMI,3,".","");
  $gunluk_kal= number_format($gunluk_kal,3,".","");
  //$idealk= number_format($idealk,3,".","");
 // $idealk= number_format($idealk,3,".","");
  $kk=30;
  $ky=30;
  $kp=30;
  $kak=5;
  $kay=5;
  $kap=5;
  $ogk=30;
  $ogy=30;
  $ogp=30;
  $oak=5;
  $oay=5;
  $oap=$aak=$aap=$aay=5;
  $akk=$aky=$akp=25;
 ?>

<!DOCTYPE html>
<html>
<head>
 <link rel="stylesheet" href="css/styleson2.css">
	<title>Orocode Egzersiz</title>
    <meta charset="utf-8">
</head>
<body>

 <form method="get" action="son2.php" id="kalori" >

 <fieldset>
<legend>Günlük Kalori Hedefiniz </legend>
<ul style="list-style-type:none">

<li>
<input type="text" id="kilo" name="kilo" size="30" value="<?php echo htmlentities($kilo_status) ?>"/> 
</li>
<li>
<label for="ideal"> İdeal Kilo:</label>
<input type="text" id="ideal" name="ideal" size="15" value="<?php echo htmlentities($idealk) ?>"/> Kg
</li>
<li>
<label for="hedef"> Hedef Kilo:</label>
<input type="text" id="hedef" name="hedef" size="15" value="<?php echo htmlentities($idealk) ?>"/> Kg
</li>
<li>
<label for="guncel"> Güncel Kilo:</label>
<input type="text" id="guncel" name="guncel" size="15" value="<?php echo htmlentities($kilo) ?>"/> Kg
</li>

<li>
<label for="haftalik"> Haftalık Hedef:</label>
<input type="text" id="haftalik" name="haftalik" size="15" value="<?php echo htmlentities($haftalik_kilo) ?>"/> Gr
</li>
<li>
	<label id="kalorihedefbaslik"> <h3>Günlük Kalori Hedefim</h3></label>
</li>
<li>
<input type="text" id="kalorihedef" name="kalorihedef" size="30" value="<?php echo htmlentities($gunluk_kal) ?>"/> kcal
</li>

<li>
<label for="carbon"> Karbonhidrat:</label>
<input type="text" class="karbonhidrat"  id="carbonyuzde" name="carbon" size="2" value="<?php echo htmlentities($karbonhidrat) ?>"/>
<input type="text"  id="carbonmik" name="carbon" size="8" value="<?php echo htmlentities($karbmik) ?>"/> Gr
</li>
<li>
<label for="protein"> Protein:</label>
<input type="text" class="protein"  id="proteinyuzde" name="protein" size="2" value="<?php echo htmlentities($protein) ?>"/>
 <input type="text" id="protein1" name="protein" size="8" value="<?php echo htmlentities($promik) ?>"/> Gr
</li>
<li>
<label for="yag"> Yağ:</label>
<input type="text" class="yag" id="yagyuzde" name="protein" size="2" value="<?php echo htmlentities($yag) ?>"/> 
<input type="text" id="yag1" name="yag" size="8" value="<?php echo htmlentities($yagmik) ?>"/> Gr
</li>

</ul>
<div id="warning"></div>
<div class="buttons">
<button type="submit" class="positive" onclick="sayHello();">Kaydet</button>

</div>

</fieldset>
</form> 




 <fieldset id="yemek">
<legend>Günlük Öğün Limitleri </legend>
<ul style="list-style-type:none">



<li>
<label for="carbon"> Kahvaltı Karb:</label>
<input type="text" class="karbonhidrat" id="kk" name="kk" size="2" value="<?php echo htmlentities($kk) ?>"/>
<input type="text" class="hesap" id="kkmik" name="kkmik" size="5" value="<?php echo htmlentities(yuzde_hesap($kk,$karbmik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Kahvaltı Protein:</label>
<input type="text" class="protein" id="kp" name="kp" size="2" value="<?php echo htmlentities($kp) ?>"/>
<input type="text" class="hesap" id="kpmik" name="kpmik" size="5" value="<?php echo htmlentities(yuzde_hesap($kp,$promik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Kahvaltı Yağ:</label>
<input type="text" class="yag" id="ky" name="ky" size="2" value="<?php echo htmlentities($ky) ?>"/>
<input type="text" class="hesap" id="kymik" name="kymik" size="5" value="<?php echo htmlentities(yuzde_hesap($ky,$yagmik)) ?>"/> Gr
</li>



<li>
<label for="carbon"> Sabah Ara Öğün karb:</label>
<input type="text" class="karbonhidrat" id="saok" name="saok" size="2" value="<?php echo htmlentities($kak) ?>"/>
<input type="text" class="hesap" id="saokmik" name="saokmik" size="5" value="<?php echo htmlentities(yuzde_hesap($kak,$karbmik)) ?>"/> Gr
</li>
<li>

<li>
<label for="protein"> Sabah Ara Öğün Protein:</label>
<input type="text" class="protein" id="saop" name="saop" size="2" value="<?php echo htmlentities($kap) ?>"/>
 <input type="text" class="hesap" id="saopmik" name="saopmik" size="5" value="<?php echo htmlentities(yuzde_hesap($kap,$promik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Sabah Ara Öğün Yağ:</label>
<input type="text" class="yag" id="saoy" name="saoy" size="2" value="<?php echo htmlentities($kay) ?>"/>
<input type="text" class="hesap" id="saoymik" name="saoymik" size="5" value="<?php echo htmlentities(yuzde_hesap($kay,$yagmik)) ?>"/> Gr
</li>

<li>
<label for="yag"> Öğlen karb:</label>
<input type="text" class="karbonhidrat" id="ok" name="ok" size="2" value="<?php echo htmlentities($ogk) ?>"/> 
<input type="text" class="hesap" id="okmik" name="okmik" size="5" value="<?php echo htmlentities(yuzde_hesap($ogk,$karbmik)) ?>"/> Gr
</li>



<li>
<label for="carbon"> Öğlen Protein:</label>
<input type="text" class="protein" id="op" name="op" size="2" value="<?php echo htmlentities($ogp) ?>"/>
<input type="text" class="hesap" id="opmik" name="opmik" size="5" value="<?php echo htmlentities(yuzde_hesap($ogp,$promik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Öğlen Yağ:</label>
<input type="text" class="yag" id="oy" name="oy" size="2" value="<?php echo htmlentities($ogy) ?>"/>
<input type="text" class="hesap" id="oymik" name="oymik" size="5" value="<?php echo htmlentities(yuzde_hesap($kk,$yagmik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Öğle Ara Öğün karb:</label>
<input type="text" class="karbonhidrat" id="oaok" name="oaok" size="2" value="<?php echo htmlentities($oak) ?>"/>
<input type="text" class="hesap" id="oaokmik" name="oaokmik" size="5" value="<?php echo htmlentities(yuzde_hesap($oak,$karbmik)) ?>"/> Gr
</li>
<li>


<li>
<label for="protein"> Öğle Ara Öğün Protein:</label>
<input type="text" class="protein" id="oaop" name="aop" size="2" value="<?php echo htmlentities($oap) ?>"/>
 <input type="text" class="hesap" id="oaopmik" name="oaopmik" size="5" value="<?php echo htmlentities(yuzde_hesap($oap,$promik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Öğle Ara Öğün Yağ:</label>
<input type="text" class="yag" id="oaoy" name="oaoy" size="2" value="<?php echo htmlentities($oay) ?>"/>
<input type="text" class="hesap" id="oaoymik" name="oaoymik" size="5" value="<?php echo htmlentities(yuzde_hesap($oay,$yagmik)) ?>"/> Gr
</li>
<li>
<label for="yag"> Akşam karb:</label>
<input type="text" class="karbonhidrat" onblur="islemyag();" id="ak" name="ak" size="2" value="<?php echo htmlentities($akk) ?>"/> 
<input type="text" class="hesap" id="akmik" name="akmik" size="5" value="<?php echo htmlentities(yuzde_hesap($akk,$karbmik)) ?>"/> Gr
</li>



<li>
<label for="carbon"> Akşam Protein:</label>
<input type="text"  class="protein" id="ap" name="ap" size="2" value="<?php echo htmlentities($akp) ?>"/>
<input type="text" class="hesap" id="apmik" name="apmik" size="5" value="<?php echo htmlentities(yuzde_hesap($akp,$promik)) ?>"/> Gr
</li>

<li>
<label for="carbon"> Akşam Yağ:</label>
<input type="text" class="yag" id="ay" name="ay" size="2" value="<?php echo htmlentities($aky) ?>"/>
<input type="text" class="hesap" id="aymik" name="aymik" size="5" value="<?php echo htmlentities(yuzde_hesap($aky,$yagmik)) ?>"/> Gr
</li>
<li>
<label for="carbon"> Akşam Ara Öğün karb:</label>
<input type="text" class="karbonhidrat" id="aaok" name="aaok" size="2" value="<?php echo htmlentities($aak) ?>"/>
<input type="text" class="hesap" id="aaokmik" name="aaokmik" size="5" value="<?php echo htmlentities(yuzde_hesap($aak,$karbmik)) ?>"/> Gr
</li>
<li>

<li>
<label for="protein"> Akşam Ara Öğün Protein:</label>
<input type="text" class="protein" id="aaop" name="aop" size="2" value="<?php echo htmlentities($aap) ?>"/>
 <input type="text" class="hesap" id="aaopmik" name="aaopmik" size="5" value="<?php echo htmlentities(yuzde_hesap($aap,$promik)) ?>"/> Gr
</li>


<li>
<label for="carbon"> Akşam Ara Öğün Yağ:</label>
<input type="text" class="yag" id="aaoy" name="aaoy" size="2" value="<?php echo htmlentities($aay) ?>"/>
<input type="text" class="hesap" id="aaoymik" name="aaoymik" size="5" value="<?php echo htmlentities(yuzde_hesap($aay,$yagmik)) ?>"/> Gr
</li>
</ul>
<div id="warnings"></div>


</fieldset>
 
<script src="js/script.js"></script>
</body>
</html>
