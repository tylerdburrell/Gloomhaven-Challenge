var clicks = 0;

function addChar() {
    clicks +=1;
    var sel = document.getElementById("class-select");
    var img = "imgs/" + sel.value  + ".png";
    if(clicks === 1){
      document.getElementById("class-img1").src = img;
      document.getElementById("class-img1").style.display="inline";
      document.getElementById("neg1").style.display=null;
      document.getElementById("pos1").style.display=null;
    } else if (clicks === 2){
      document.getElementById("class-img2").src = img;
      document.getElementById("class-img2").style.display="inline";
      document.getElementById("neg2").style.display=null;
      document.getElementById("pos2").style.display=null;
    } else if (clicks === 3){
      document.getElementById("class-img3").src = img;
      document.getElementById("class-img3").style.display="inline";
      document.getElementById("neg3").style.display=null;
      document.getElementById("pos3").style.display=null;
    } else if (clicks === 4){
      document.getElementById("class-img4").src = img;
      document.getElementById("class-img4").style.display="inline";
      document.getElementById("neg4").style.display=null;
      document.getElementById("pos4").style.display=null;
    }

}
