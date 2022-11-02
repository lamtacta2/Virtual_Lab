var Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature;

function readFom() {
  Velocity = document.getElementById("velocity").value;
  Laser_input_energy = document.getElementById("lie").value;
  Ambient_temperature = document.getElementById("at").value;
  Substrate_preheating_temperature = document.getElementById("spt").value;
  console.log(Velocity, Laser_input_energy, Ambient_temperature, Substrate_preheating_temperature);
}


firebase
.database()
.ref("Output")
.on("value", function (snap) {
  document.getElementById("output").value = snap.val().Output;
});

firebase
.database()
.ref("Input")
.update({
  Velocity: 10,
  Laser_input_energy: 1,
  Ambient_temperature: 10,
  Substrate_preheating_temperature: 10,
  Control: 0,
  control_unity: 0,
});


document.getElementById("MP").onclick = function () {
  readFom();

  firebase
    .database()
    .ref("Input")
    .update({
      Velocity: Velocity,
      Laser_input_energy: Laser_input_energy,
      Ambient_temperature: Ambient_temperature,
      Substrate_preheating_temperature: Substrate_preheating_temperature,
      Control: 1,
      control_unity: 1,
    });
};

document.getElementById("PP").onclick = function () {
    readFom();
  
    firebase
      .database()
      .ref("Input")
      .update({
        Velocity: Velocity,
        Laser_input_energy: Laser_input_energy,
        Ambient_temperature: Ambient_temperature,
        Substrate_preheating_temperature: Substrate_preheating_temperature,
        Control: 2,
        control_unity: 1,
      });
  };

  // document.getElementById("PA").onclick = function () {
  //   readFom();
  
  //   firebase
  //     .database()
  //     .ref("Input")
  //     .set({
  //       Velocity: Velocity,
  //       Laser_input_energy: Laser_input_energy,
  //       Ambient_temperature: Ambient_temperature,
  //       Substrate_preheating_temperature: Substrate_preheating_temperature,
  //       Control: 3,
  //     });
  // };

  document.getElementById("Reset").onclick = function () {
    readFom();

    document.getElementById("velocity").value = 10;
    document.getElementById("lie").value = 1;
    document.getElementById("at").value = 10;
    document.getElementById("spt").value = 10;

    firebase
      .database()
      .ref("Input")
      .update({
        Velocity: Velocity,
        Laser_input_energy: Laser_input_energy,
        Ambient_temperature: Ambient_temperature,
        Substrate_preheating_temperature: Substrate_preheating_temperature,
        Control: 0,
        control_unity: 0,
      });

      location.reload();
  };



// document.getElementById("output").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .on("value", function (snap) {
//       document.getElementById("roll").value = snap.val().rollNo;
//       document.getElementById("name").value = snap.val().name;
//       document.getElementById("gender").value = snap.val().gender;
//       document.getElementById("address").value = snap.val().address;
//     });
// };



// document.getElementById("update").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .update({
//       //   rollNo: rollV,
//       name: nameV,
//       gender: genderV,
//       address: addressV,
//     });
//   alert("Data Update");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };
// document.getElementById("delete").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .remove();
//   alert("Data Deleted");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };
