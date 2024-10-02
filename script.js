var form = document.getElementById('resumeForm');
var resumeDiv = document.getElementById('resume');
var innerContainer = document.getElementById('innerContainer');
var shareableLinkDiv = document.getElementById('shareable-link');
var copyLinkBtn = document.getElementById('copy-link-btn');
var downloadBtn = document.getElementById('download-btn');
document.addEventListener("DOMContentLoaded", function () {
    var profilepic = document.getElementById('pic');
    var inputFile = document.getElementById('profilePicture');
    inputFile.onchange = function () {
        if (inputFile.files && inputFile.files[0]) {
            profilepic.src = URL.createObjectURL(inputFile.files[0]);
        }
        else {
            console.log("No file selected.");
        }
    };
    form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        var fileInput = document.getElementById('profilePicture');
        var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function () {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: reader.result,
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        };
        if (file) {
            reader.readAsDataURL(file); // Read the image file
        }
        else {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: '',
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        }
    });
    function generateResume(data) {
        var imageHTML = data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" class=\"image\">") : '';
        downloadBtn.style.display = "block";
        resumeDiv.innerHTML = "\n      <div class=\"resumeContainer\">\n          <div class=\"information\">\n              <div class=\"nameAndImage\">\n                  <div>".concat(imageHTML, "</div>\n                  <h2>").concat(data.name, "</h2>\n                  <p>").concat(data.jobTitle, "</p>\n              </div>\n              <div class=\"Contact\">\n                <div class=\"box\">\n                <i class=\"fa-solid fa-paper-plane\"></i>\n                <p>").concat(data.email, "</p>\n                </div>\n                <div class=\"box\">\n                <i class=\"fa-solid fa-phone\"></i>\n                <p>").concat(data.phone, "</p>\n                </div>\n              </div>\n          </div>\n          <div class=\"data\">\n              <div class=\"education space\">\n              <h2>Education</h2>\n              <p>").concat(data.degree, " from ").concat(data.school, "</p>\n              </div>\n              <div class=\"experience space\">\n              <h2>Experience</h2>\n              <p>").concat(data.jobTitle, " at ").concat(data.company, "</p>\n              </div>\n              <div class=\"skills space\">\n              <h2>Skills</h2>\n              <ul>\n              ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n              </ul>\n              </div>\n          </div>\n      </div>\n      ");
        innerContainer.style.display = "none";
        // Create shareable link
        var resumeLink = generateShareableLink(data.name);
        shareableLinkDiv.innerHTML = "Shareable Link: <a href=\"".concat(resumeLink, "\" target=\"_blank\">").concat(resumeLink, "</a>");
        copyLinkBtn.style.display = "block";
        // Setup Copy Link functionality
        copyLinkBtn.addEventListener('click', function () {
            copyToClipboard(resumeLink);
            alert("Link copied to clipboard!");
        });
        // Setup PDF Download functionality
        downloadBtn.addEventListener('click', function () {
            downloadPDF(resumeDiv);
        });
    }
    // Function to generate a shareable link based on username
    function generateShareableLink(username) {
        var formattedUsername = username.toLowerCase().replace(/\s+/g, '-');
        // Detect if the code is running locally or on the deployed server
        var isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        // If running locally, use a local preview link
        var baseUrl = isLocal ? window.location.href : "https://hachathon-milestone-05.vercel.app";
        return "".concat(baseUrl, "?username=").concat(formattedUsername);
    }
    // Function to copy link to clipboard
    function copyToClipboard(text) {
        var tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }
    // Function to download the resume as a PDF
    function downloadPDF(element) {
        var options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    }
});
