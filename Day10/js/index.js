document
.getElementById("btnRegisterPatient")
.addEventListener("click", function (event) {
  event.preventDefault(); // prevent form submission

  let patientIdNumber = document.getElementById("patientIdNumber");
  let firstName = document.getElementById("firstName");
  let middleInitials = document.getElementById("middleInitials");
  let lastName = document.getElementById("lastName");
  let dateOfBirth = document.getElementById("dateOfBirth");
  let ddlDepartment = document.getElementById("ddlDepartment");
  let radioIsOutPatientYes = document.getElementById(
    "radioIsOutPatientYes"
  );
  let radioIsOutPatientNo = document.getElementById(
    "radioIsOutPatientNo"
  );

  let isValid = true;

  [
    patientIdNumber,
    firstName,
    lastName,
    dateOfBirth,
    ddlDepartment,
  ].forEach((input) => {
    if (
      !input.value ||
      (input.hasAttribute("pattern") &&
        !new RegExp(input.getAttribute("pattern")).test(input.value))
    ) {
      isValid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!(radioIsOutPatientYes.checked || radioIsOutPatientNo.checked)) {
    isValid = false;
    radioIsOutPatientYes.classList.add("is-invalid");
    radioIsOutPatientNo.classList.add("is-invalid");
  } else {
    radioIsOutPatientYes.classList.remove("is-invalid");
    radioIsOutPatientNo.classList.remove("is-invalid");
  }

  if (!isValid) {
    alert(
      "Please fill in all required fields with the correct format."
    );
    return;
  }

  let ageMilliSeconds = Date.now() - new Date(dateOfBirth.value);
  let ageDate = new Date(ageMilliSeconds);
  let isOld =
    Math.abs(ageDate.getUTCFullYear() - 1970) > 65 ? true : false;

  let newRow = document.createElement("tr");
  newRow.classList.add(isOld ? "elderly" : "notElderly");
  newRow.classList.add(
    radioIsOutPatientYes.checked ? "outPatients" : "inPatients"
  );

  newRow.innerHTML = `
        <td>${patientIdNumber.value}</td>
        <td>${firstName.value}</td>
        <td>${middleInitials.value}</td>
        <td>${lastName.value}</td>
        <td>${dateOfBirth.value}</td>
        <td>${ddlDepartment.value}</td>
        <td>${radioIsOutPatientYes.checked ? "Yes" : "No"}</td>
    `;

  document.getElementById("tbodyPatientsList").appendChild(newRow);

  document.getElementById("btnReset").click();
});
document
.getElementById("chkElderlyPatients")
.addEventListener("click", function (event) {
  let isChecked = document.getElementById("chkElderlyPatients").checked;

  let notElderlyRows = document.getElementsByClassName("notElderly");
  for (const row of notElderlyRows) {
    if (isChecked) {
      row.classList.add("d-none");
    } else {
      row.classList.remove("d-none");
    }
  }
});

document
.getElementById("chkShowOutPatients")
.addEventListener("click", function (event) {
  let isChecked = document.getElementById("chkShowOutPatients").checked;

  let inPatients = document.getElementsByClassName("inPatients");
  for (const row of inPatients) {
    if (isChecked) {
      row.classList.add("d-none");
    } else {
      row.classList.remove("d-none");
    }
  }
});