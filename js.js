// Object to store comments for each hospital
const comments = {
  "مشفى الباب": [],
  "مشفى الفتح": [],
  "مشفى دوا": [],
  "مشفى الماجد": [],
  "مشفى الفارابي": [],
};

// This function identifies the hospital that the user clicked on and displays the comment page
let currentHospital = "";
function display_comment(button) {
  document.getElementById("hospital-comment").style.display = "block";
  document.getElementById("results").style.display = "none";
  document.getElementById("search").style.display = "none";

  const hospitalCard = button.parentElement;
  const hospitalName = hospitalCard.getAttribute("data-name");
  currentHospital = hospitalName;

  document.getElementById("hospital-name").innerText = hospitalName;

  showme_comment();
}

// This function sends the comment and stores it in local storage
function send() {
  const codeInput = document.getElementById("codes");
  const commentText = codeInput.value.trim();

  if (commentText !== "") {
    comments[currentHospital].push(commentText);

    localStorage.setItem("hospitalComments", JSON.stringify(comments));

    codeInput.value = "";
    codeInput.style.border = "";

    showme_comment();
  } else {
    codeInput.style.border = "1px solid red";
  }
}

// This function loads the old comments stored in the browser when the page is loaded
window.onload = function () {
  const storedComments = localStorage.getItem("hospitalComments");
  if (storedComments) {
    Object.assign(comments, JSON.parse(storedComments));
  }
};

// This function displays comments related to the currently selected hospital
function showme_comment() {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  const hospitalComments = comments[currentHospital];

  if (hospitalComments.length === 0) {
    commentsList.innerHTML = "<p>لا توجد تعليقات حتى الآن.</p>";
  } else {
    hospitalComments.forEach((comment, index) => {
      const commentItem = document.createElement("div");
      commentItem.className = "comment-item";

      // Create an element to display the comment
      const commentText = document.createElement("span");
      commentText.innerText = comment;

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "حذف";
      deleteButton.onclick = function () {
        deleteComment(index);
      };

      // Add the comment and delete button to the main element
      commentItem.appendChild(commentText);
      commentItem.appendChild(deleteButton);

      commentsList.appendChild(commentItem);
    });
  }
}

// This function deletes a comment from the list and updates local storage
function deleteComment(index) {
  // Remove the comment from the list
  comments[currentHospital].splice(index, 1);

  // Update the localStorage
  localStorage.setItem("hospitalComments", JSON.stringify(comments));

  // Refresh the comments display after deletion
  showme_comment();
}

// This function filters and displays hospital cards based on the search query
function searchHospital() {
  let searchQuery = document.querySelector("#search input").value.toLowerCase();
  let hospitalCards = document.querySelectorAll(".hospital-card");

  hospitalCards.forEach(function (card) {
    let hospitalName = card.getAttribute("data-name").toLowerCase();
    let hospitalLocation = card.getAttribute("data-location").toLowerCase();

    if (
      hospitalName.includes(searchQuery) ||
      hospitalLocation.includes(searchQuery)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// This function displays the details of the selected hospital, including its doctors
function viewDetails(button) {
  document.getElementById("results").style.display = "none";
  document.getElementById("search").style.display = "none";

  let hospitalCard = button.parentElement;
  let hospitalName = hospitalCard.querySelector("h2").textContent;
  let hospitalLocation = hospitalCard.getAttribute("data-location");
  let hospitalImage = hospitalCard.querySelector("img").src;

  document.getElementById("details-name").textContent = hospitalName;
  document.getElementById(
    "details-location"
  ).textContent = `الموقع: ${hospitalLocation}`;
  document.getElementById("details-image").src = hospitalImage;

  const doctorsList = {
    "مشفى الباب": [
      { name: " ", specialization: "جراحة الأوعية" },
      { name: ". عبد الحميد حفني", specialization: "الطب الشرعي" },
      { name: "د. فيصل العبد", specialization: "العيادة الداخلية /رجال/" },
      { name: "د. دولت الرينة", specialization: "العيادة الداخلية /نساء/" },
      { name: "د. مديحة القاسم", specialization: "العيادة النسائية" },
      { name: "د. ياسين الحمش", specialization: "العيادة الأذنية" },
      { name: "د. غازي العلي", specialization: "العيادة السنية /رجال/" },
      { name: "د. أماني الهندي", specialization: "العيادة السنية /نساء/" },
      { name: "د. حسين الحسين", specialization: "العيادة البولية" },
      { name: "د. محمد خير طفور", specialization: "التخدير" },
      { name: "عيادة المعالج الفيزيائي", specialization: "" },
      { name: "عيادة تخطيط السمع", specialization: "" },
    ],
    "مشفى الفتح": [
      { name: "", specialization: "جراحة تنظيرية" },
      { name: "", specialization: "جراحة وتنظير بولي" },
      { name: "", specialization: "نسائية" },
      { name: "", specialization: "جراحة عامة" },
      { name: "", specialization: "تنظير هضمي" },
      { name: "", specialization: "عينية" },
      { name: "", specialization: "أذنية" },
      { name: "", specialization: "توليد" },
 ],
    "مشفى دوا": [
    
      { name: "د. رؤى عبد الهادي", specialization: "عيادة الغدد" },
      { name: "د. عماد قيصوم", specialization: "العيادة الصدرية" },
      { name: "د. عمار دياربكرلي", specialization: "الجراحة العامة" },
      { name: "د. مؤيد قبطور", specialization: "الجراحة العامة" },
      { name: "د. زاهر النسر", specialization: "العيادة الوعائية" },
      { name: "د. انس حمدان", specialization: "العيادة العصبية" },
      { name: "د. فادي جمال الدين", specialization: "العيادة العصبية" },
      { name: "د. محمود درويش", specialization: "أمراض الدم والأورام" },
      { name: "د. موفق شرف الدين", specialization: "العيادة العصبية" },
      { name: "د. مرام الشيخ", specialization: "العيادة الوعائية" },
      { name: "د. محمد سعيد بكار", specialization: "أمراض الدم والأورام" },
      { name: "د. حسين جابري", specialization: "الجراحة الفكية وزراعة الأسنان" },
      { name: "د. بشار القادري",specialization: "العيادة الصدرية" },
      { name: "د. محمد السلمو", specialization: "العيادة الداخلية" },
      { name: "د. اكرم عبيد", specialization: "العيادة الداخلية" },
      { name: "د. خليل عياط", specialization: "العيادة الداخلية" },
      { name: "د. محمد جرود", specialization: "الأنف والأذن والحنجرة" },
      { name: "د. محمد فياض", specialization: "العيادة الصدرية" },
      { name: "د. جمال نجار", specialization: "جراحة عامة" },
      { name: "د. احمد عبد القادر", specialization: "العيادة القلبية" },
      { name: "د. عماد قباني", specialization: "العيادة الوعائية" }
    ],
    "مشفى الماجد": [
      { name: "د. أيمن مقمق", specialization: "جراحة تنظيرية" },
      { name: "د. فادي حاج علي", specialization: "جراحة عظمية" },
      { name: "د. يحيى البوشي", specialization: "جراحة بولية" },
      { name: "دمعن الفياض", specialization: "جراحة تنظيرية" },
      { name: "د. أحمد عابو", specialization: "جراحة تنظيرية" },
      { name: "د. هوشان المحاوي", specialization: "جراحة عصبية" },
      { name: "د. عزيز العلي", specialization: "توليد" },
      { name: "د. جابر الأحمد", specialization: "جراحة عظمية" },
      { name: "د. عمار السايح", specialization: "جراحة أطفال" },
      { name: "د. خالد خلوف", specialization: "جراحة أوعية" },
      { name: "د. طلال السبسبي", specialization: "جراحة فكية" },
      { name: "د. أيمن مقمق", specialization: "جراحة عامة" },
      { name: "د. كامل فخرو", specialization: "جراحة أذن أنف حنجرة" },
      { name: "الدكتورة دعاء عثمان", specialization: "أسنان" },
      { name: "د. مهند كزكاز", specialization: "تخدير" },
      { name: "الفني صهيب الشيخ ويس", specialization: "تخدير" },
      { name: "المساعد فؤاد الإبراهيم", specialization: "مساعد جراح" },
      { name: "المساعد مصطفى درويش", specialization: "مساعد جراح" },
      { name: "موفق هارون", specialization: "جراحة أنف وأذن وحنجرة" }
    ],
    "مشفى الراعي": [
      {
        name: "الدكتور أسامة الفباض",
        specialization: "العيادة الداخلية",
        link: "https://ee.kobotoolbox.org/x/WFK4XSSX",
      },
      {
        name: "العيادة الداخلية 2",
        specialization: "العيادة الداخلية",
        link: "https://ee.kobotoolbox.org/x/m4m1kn25",
      },
      {
        name: "العيادة الهضمية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/PNDb5yGF",
      },
      {
        name: "عيادة أمراض الغدة",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/ugIwQoXe",
      },
      {
        name: "عيادة الكلية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/ksUfcukI",
      },
      {
        name: "عيادة الجراحة العصبية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/tpjfS0ek",
      },
      {
        name: "الدكتور محمد مروش",
        specialization: "عيادة الجراحة العامة",
        link: "https://ee.kobotoolbox.org/x/i44Rtf1Q",
      },
      {
        name: "عيادة العظمية (الدكتور محمد رجب)",
        specialization: "العيادة العظمية",
        link: "https://ee.kobotoolbox.org/x/rfaK6VxE",
      },
      {
        name: "عيادة الداخلية القلبية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/ZczxB7Cv",
      },
      {
        name: "الدكتور هند حج عيسى",
        specialization: "العيادة العينية",
        link: "https://ee.kobotoolbox.org/x/GYa3e1Ay",
      },
      {
        name: "عيادة النسائية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/Rnco4hVR",
      },
      {
        name: "عيادة الجلدية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/v2R3H6FT",
      },
      {
        name: "عيادة قلبية الأطفال",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/zcwC8Spn",
      },
      {
        name: "الدكتور عبد القادر العيدو",
        specialization: "العيادة الأطفال",
        link: "https://ee.kobotoolbox.org/x/WnL3YCcf",
      },
      {
        name: "عيادة أذن انف حنجرة",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/UYEQPlpz",
      },
      {
        name: "الدكتور حسن الدج",
        specialization: "العيادة السنية للرجال",
        link: "https://ee.kobotoolbox.org/x/f7wuiMaL",
      },
      {
        name: "الدكتور خالد الماوي",
        specialization: "العيادة السنية للرجال",
        link: "https://ee.kobotoolbox.org/x/EdH9lYM2",
      },
      {
        name: "الجراحة الفكية",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/eUjKjDn3",
      },
      {
        name: "الدكتور يحيى البوشي",
        specialization: "العيادة البولية",
        link: "https://ee.kobotoolbox.org/x/OuEw58lf",
      },
      {
        name: "عيادة المسح السمعي للأطفال وحديثي الولادة",
        specialization: "",
        link: "",
      },
      {
        name: "عيادة المفاصل الروماتيزم",
        specialization: "",
        link: "https://ee.kobotoolbox.org/x/O2fHnP1j",
      },
      { name: "عيادة المعالج الفيزيائي", specialization: "", link: "" },
    ],
  };
  let hoursList = {
    "مشفى الباب": "24 ساعة",
    "مشفى الفتح": "24 ساعة",
    "مشفى الماجد": "24 ساعة",
    "مشفى الراعي": "24 ساعة",
    "مشفى دوا": "24 ساعة"  ,
   // "مشفى الفارابي": "24 ساعة"  
};
document.getElementById("details-hours").textContent = `ساعات العمل: ${hoursList[hospitalName] || "غير متوفر"}`;


  let servicesList = {
    "مشفى الباب": ["جراحة عامة", "طب الأطفال","أشعة", "طوارئ","عناية مركزة"],
    "مشفى الفتح": ["جراحة تنظيرية", "عناية مركزة", "خدمات توليد"],
    "مشفى الماجد": ["طب الأسرة", "طب الأطفال", "طوارئ"],
    "مشفى دوا": ["رنين مغناطيسي ","تصوير طبقي محوري","أشعة", "طب الأطفال", "طوارئ"],
   // "مشفى الفارابي": ["رنين مغناطيسي ","تصوير طبقي محوري","أشعة", "طب الأطفال", "طوارئ"],
    "مشفى الراعي": ["جراحة عامة", "طب الأطفال","أشعة", "طوارئ","عناية مركزة"]
};
document.getElementById("details-services").textContent = `الخدمات المتاحة: ${servicesList[hospitalName].join(", ") || "غير متوفر"}`;

  const doctors = doctorsList[hospitalName] || [];
  const doctorsListElement = document.getElementById("details-doctors");
  doctorsListElement.innerHTML = doctors
  .map(
    (doc) =>
    `<li class="doctor-item">${doc.name} - ${doc.specialization} ${
          doc.link
            ? `<a href="${doc.link}" target="_blank" class="reserve">احجز هنا</a>`
            : ""
        }</li>`
)
.join("");

document.getElementById("hospital-details").style.display = "block";
}

// This function closes the hospital details view and shows the search and results again
function closeDetails() {
  document.getElementById("hospital-details").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("search").style.display = "block";
}

// This function closes the comment page and shows the search and results again
function close_comment() {
  document.getElementById("hospital-comment").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("search").style.display = "block";
}

// This function shows the search section and the results list
function showSearch() {
  document.getElementById("search").style.display = "block";
  document.getElementById("results").style.display = "block";
  document.getElementById("hospital-details").style.display = "none";
}

// This function displays an alert when the reservation button is clicked
function makeReservation() {

}

// This function handles contact with the hospital by opening a WhatsApp link in a new tab
function contactHospital() {
  let cards = document.querySelectorAll(".hospital-card");
  cards.forEach((card, index) => {
    let contactButton = card.querySelector(
      'button[onclick="contactHospital()"]'
    );
    if (contactButton) {
      contactButton.addEventListener("click", () => {
        let contactNumber = card.getAttribute("data-contact");
        let url = "https://wa.me/" + contactNumber;
        window.open(url, "_blank").focus();
      });
    }
  });
}

// This function displays the footer
function footer() {
  var footerContainer = document.querySelector(".footerContainer");
  footerContainer.style.display = "block";
}

