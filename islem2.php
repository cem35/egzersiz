
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
	//$REE += $REE/10;
	//$BEE=$REE*0.1*$aktivite;
	$BEE+=($REE*0.1);
	$BEE+=($REE*$aktivite);
	$idealk=(217/10)*boy_hesap($boy);
}

echo "Body Mass İndex =".$BMI."<br>". 
 "Resting Energy Expenditure = ".$REE."<br>".
 "Bazal Energy Expenditure = ".$BEE."<br>".
 "İdeal kilo = ".$idealk;

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
	echo "<br> kilonuz normal <br>";
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
  echo "<br> Günlük kalori ihtiyacı= ".$gunluk_kal;
  echo "<br> Günlük karbonhidrat miktarı (%50) =".((yuzde_hesap($karbonhidrat,$gunluk_kal))/4)." <br>
  Günlük Protein miktarı (%20) =".(yuzde_hesap($protein,$gunluk_kal)/4)."<br> 
  Günlük Yağ miktarı (%30) =".(yuzde_hesap($yag,$gunluk_kal)/9);








 ?>