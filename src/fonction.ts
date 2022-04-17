let pos = {
  HQR: [30, 30],
  HQB: [30, 30],
  HQJ: [30, 30],
  HQV: [30, 30],
  B0: [15, 15],
  B1: [15, 45],
  B2: [45, 15],
  B3: [45, 45],
  B4: [45, 45],
  B5: [15, 60],
  B6: [60, 15],
  B7: [45, 60],
  B8: [60, 60],
};

export async function valideDeplacement(destination) {
    const chemin:string[] = await updateTankPos(destination);
    let chemin2:[][] = [];
    for (const a of chemin){
        chemin2.push(pos[a])
    }

    return chemin2;
    // for (const [key, value] of Object.entries(pos)) {
    //     pos[key] = value;
    //   }
    // if (distance < 5) {
    //   setPoseCar([50, 50, 50]);
    // }
    // await updateTankPos()
  }

  async function updateTankPos(destination):Promise<string[]>{
    const response = await fetch(
      "http://localhost/power/php/fonction_partie.php?p=calcul_chemin&c1=t&c2=HQB" +
        
        "&c3="+destination +"&joueur=R&partie=9&tour=0",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Access-Control-Request-Headers": "*",
        },
      }
    );

    const responseData = await response.json();
    return new Promise((successCallback, failureCallback) => {
      if (response.ok) {
        var dictOfResponseData: any = {};
        for (const [key, value] of Object.entries(responseData)) {
          dictOfResponseData[key] = value;
        }

        successCallback(dictOfResponseData["reponse"]);
      } else {
        failureCallback("error");
      }
    });
  }
export default pos;
