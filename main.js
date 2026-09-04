/* SME Business Accountants — main.js */
window.addEventListener("DOMContentLoaded", function () {

  /* ── LENIS SMOOTH SCROLL ── */
  var lenis;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({ duration: 1.15, easing: function(t){return Math.min(1,1.001-Math.pow(2,-10*t));} });
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function(t){ lenis.raf(t*1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener("click", function(e){
        var id = a.getAttribute("href"); if(!id||id==="#") return;
        var el = document.querySelector(id);
        if(el){ e.preventDefault(); lenis.scrollTo(el, {offset:-74, duration:1.3}); }
      });
    });
  }

  /* ── LOADER ── */
  var loader  = document.getElementById("loader");
  var ldFill  = document.querySelector(".ld-fill");
  document.body.style.overflow = "hidden";
  if (ldFill) setTimeout(function(){ ldFill.style.width = "100%"; }, 60);

  setTimeout(function(){
    if (!loader) { document.body.style.overflow = ""; animHero(); return; }
    if (typeof gsap !== "undefined") {
      gsap.to(loader, { opacity:0, duration:0.8, ease:"power2.inOut",
        onComplete: function(){ loader.style.display="none"; document.body.style.overflow=""; animHero(); }
      });
    } else {
      loader.style.transition = "opacity 0.8s"; loader.style.opacity = "0";
      setTimeout(function(){ loader.style.display="none"; document.body.style.overflow=""; animHero(); }, 900);
    }
  }, 1600);

  /* ── NAVBAR ── */
  var navbar = document.getElementById("navbar");
  function syncNav(){ if(navbar) navbar.classList.toggle("scrolled", window.scrollY > 50); }
  window.addEventListener("scroll", syncNav, {passive:true}); syncNav();

  /* ── MOBILE MENU ── */
  var ham = document.getElementById("hamburger");
  var mob = document.getElementById("mobilePanel");
  if (ham && mob) {
    ham.addEventListener("click", function(){ mob.classList.toggle("open"); });
    mob.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ mob.classList.remove("open"); }); });
  }

  /* ── ACTIVE NAV ── */
  var sections = document.querySelectorAll("section[id]");
  var navAs    = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", function(){
    var y = window.scrollY + 120;
    sections.forEach(function(s){
      var link = document.querySelector('.nav-links a[href="#'+s.id+'"]');
      if(link) link.classList.toggle("active", y>=s.offsetTop && y<s.offsetTop+s.offsetHeight);
    });
  }, {passive:true});

  /* ── SCROLL PROGRESS ── */
  var bar = document.getElementById("progressBar");
  if(bar) window.addEventListener("scroll", function(){
    bar.style.width = (window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+"%";
  }, {passive:true});

  /* ── HERO ANIMATION ── */
  function animHero(){
    if(typeof gsap === "undefined") return;
    gsap.timeline({defaults:{ease:"power3.out"}})
      .from(".hero-live-tag",      {opacity:0, y:-16, duration:0.5})
      .from(".hero-h1",            {opacity:0, y:48,  duration:0.9, ease:"power4.out"}, "-=0.2")
      .from(".hero-sub",           {opacity:0, y:28,  duration:0.7}, "-=0.5")
      .from(".hero-btns",          {opacity:0, y:20,  duration:0.6}, "-=0.4")
      .from(".hero-service-cards .hsc-card", {opacity:0, x:40, stagger:0.12, duration:0.7}, "-=0.8")
      .from(".quality-badge",      {opacity:0, scale:0.4, duration:0.7, ease:"back.out(2)"}, "-=0.5")
      .from(".float-left",         {opacity:0, x:-30, duration:0.7}, "-=0.4")
      .from(".float-right",        {opacity:0, x:30,  duration:0.7}, "-=0.5");
  }

  /* ── SCROLL ANIMATIONS ── */
  if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"){
    gsap.registerPlugin(ScrollTrigger);

    function reveal(sel, trigger, stagger){
      var els = document.querySelectorAll(sel);
      if(!els.length) return;
      gsap.from(els, {
        scrollTrigger:{ trigger: trigger||els[0], start:"top 82%", once:true },
        opacity:0, y:32, duration:0.7, stagger:stagger||0.1, ease:"power3.out"
      });
    }
    reveal(".sb-item",   ".stats-bar",     0.1);
    reveal(".svc-card",  ".svc-grid",      0.1);
    reveal(".why-card",  ".why-cards-grid",0.1);
    reveal(".wm-row",    ".why-metrics",   0.07);
    reveal(".faq-item",  ".faq-list",      0.07);
    reveal(".cd",        ".cta-details",   0.1);
    reveal(".about-check-row", ".about-checks", 0.08);

    gsap.from(".about-card-main", {
      scrollTrigger:{trigger:".about-wrap", start:"top 80%", once:true},
      opacity:0, x:-50, duration:1, ease:"power3.out"
    });
    gsap.from(".af-right, .af-left", {
      scrollTrigger:{trigger:".about-wrap", start:"top 75%", once:true},
      opacity:0, scale:0.7, duration:0.8, stagger:0.2, ease:"back.out(1.5)"
    });
    gsap.from(".about-content > *", {
      scrollTrigger:{trigger:".about-content", start:"top 80%", once:true},
      opacity:0, y:24, duration:0.7, stagger:0.09, ease:"power3.out"
    });
    gsap.from(".leader-card", {
      scrollTrigger:{trigger:".leader-section", start:"top 82%", once:true},
      opacity:0, y:40, duration:0.9, ease:"power3.out"
    });
    gsap.from(".cta-inner > *", {
      scrollTrigger:{trigger:".cta-section", start:"top 82%", once:true},
      opacity:0, y:28, duration:0.7, stagger:0.1, ease:"power3.out"
    });
  }

  /* ── COUNTERS ── */
  var countered = false;
  function runCounters(){
    if(countered) return; countered = true;
    document.querySelectorAll(".counter").forEach(function(el){
      var target = parseInt(el.dataset.target,10); if(isNaN(target)) return;
      var start = null, dur = 2000;
      requestAnimationFrame(function step(ts){
        if(!start) start = ts;
        var p = Math.min((ts-start)/dur, 1);
        el.textContent = Math.floor((1-Math.pow(1-p,3))*target);
        if(p<1) requestAnimationFrame(step); else el.textContent = target;
      });
    });
  }

  if(typeof ScrollTrigger !== "undefined"){
    ScrollTrigger.create({ trigger:".stats-bar", start:"top 88%", once:true, onEnter:runCounters });
    ScrollTrigger.create({ trigger:".why-metrics", start:"top 88%", once:true, onEnter:runCounters });
  } else {
    var sb = document.querySelector(".stats-bar");
    if(sb) new IntersectionObserver(function(e){ if(e[0].isIntersecting) runCounters(); },{threshold:0.2}).observe(sb);
  }

  /* ── FAQ ── */
  document.querySelectorAll(".faq-item").forEach(function(item){
    item.querySelector(".faq-btn").addEventListener("click", function(){
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(i){ i.classList.remove("open"); });
      if(!open) item.classList.add("open");
    });
  });

  /* ── CARD HOVER TILT ── */
  if(typeof gsap !== "undefined"){
    document.querySelectorAll(".svc-card, .why-card").forEach(function(card){
      card.style.transformStyle = "preserve-3d";
      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        gsap.to(card, {
          rotateX: ((e.clientY-r.top)/r.height-0.5)*-6,
          rotateY: ((e.clientX-r.left)/r.width-0.5)*6,
          duration:0.4, ease:"power1.out", transformPerspective:800
        });
      });
      card.addEventListener("mouseleave", function(){
        gsap.to(card, {rotateX:0, rotateY:0, duration:0.6, ease:"power2.out"});
      });
    });
  }

/* ══════════════════════════════════════════════
   BOOKING CALENDAR
══════════════════════════════════════════════ */

var calendar = document.getElementById("calendar");
var timeSlot = document.getElementById("timeSlot");

var clientName = document.getElementById("clientName");
var clientEmail = document.getElementById("clientEmail");
var companyName = document.getElementById("companyName");
var consultationReason = document.getElementById("consultationReason");
var bookBtn = document.getElementById("bookBtn");


if (calendar) {

  var currentDate = new Date();
  var selectedDate = null;

  /*
   * TEMPORARY BOOKED DATES
   *
   * Later these will come from your database/backend.
   *
   * Format:
   * "YYYY-MM-DD"
   */
  var bookedDates = [
    "2026-09-08",
    "2026-09-12",
    "2026-09-18",
    "2026-09-25"
  ];

  /*
   * Available appointment times
   */
  var availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  }

  function renderCalendar() {

    /*
 * BOOK CONSULTATION
 */
if (bookBtn) {

  bookBtn.addEventListener("click", function () {

    if (!selectedDate) {
      alert("Please select a consultation date.");
      return;
    }

    if (!timeSlot || !timeSlot.value) {
      alert("Please select a consultation time.");
      return;
    }

    if (!clientName || !clientName.value.trim()) {
      alert("Please enter your full name.");
      clientName.focus();
      return;
    }

    if (!clientEmail || !clientEmail.value.trim()) {
      alert("Please enter your email address.");
      clientEmail.focus();
      return;
    }

    if (!companyName || !companyName.value.trim()) {
      alert("Please enter your company name.");
      companyName.focus();
      return;
    }

    if (!consultationReason || !consultationReason.value.trim()) {
      alert("Please tell us the reason for your consultation.");
      consultationReason.focus();
      return;
    }

    /*
     * Collect booking information
     */
    var bookingDetails = {
      date: selectedDate,
      time: timeSlot.value,
      name: clientName.value.trim(),
      email: clientEmail.value.trim(),
      company: companyName.value.trim(),
      reason: consultationReason.value.trim()
    };

    console.log("Booking Details:", bookingDetails);

    alert(
      "Thank you, " + bookingDetails.name + "!\n\n" +
      "Your consultation request has been received.\n\n" +
      "Date: " + bookingDetails.date + "\n" +
      "Time: " + bookingDetails.time + "\n" +
      "Company: " + bookingDetails.company
    );

  });

}


    calendar.innerHTML = "";

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();

    /*
     * First day of the month
     */
    var firstDay = new Date(year, month, 1);

    /*
     * Number of days in month
     */
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    /*
     * Convert Sunday=0 into Monday=0
     */
    var startingDay = firstDay.getDay();

    if (startingDay === 0) {
      startingDay = 6;
    } else {
      startingDay--;
    }

    /*
     * Create empty cells before day 1
     */
    for (var i = 0; i < startingDay; i++) {

      var empty = document.createElement("div");

      empty.className = "day empty";

      calendar.appendChild(empty);
    }

    /*
     * Create calendar days
     */
    for (var day = 1; day <= daysInMonth; day++) {

      var date = new Date(year, month, day);

      var dateString = formatDate(date);

      var dayElement = document.createElement("div");

      dayElement.className = "day";

      dayElement.textContent = day;

      /*
       * Check if this date is booked
       */
      if (bookedDates.indexOf(dateString) !== -1) {

        dayElement.classList.add("full");

        dayElement.title = "Fully booked";

      } else {

        dayElement.classList.add("available");

        dayElement.addEventListener("click", function() {

          selectDate(this, year, month);

        });

      }

      /*
       * Keep selected date highlighted
       */
      if (selectedDate === dateString) {
        dayElement.classList.add("selected");
      }

      calendar.appendChild(dayElement);
    }

    /*
     * Update month heading
     */
    var monthYear = document.getElementById("monthYear");

    if (monthYear) {

      monthYear.textContent = currentDate.toLocaleDateString(
        "en-ZA",
        {
          month: "long",
          year: "numeric"
        }
      );

    }

  }

  /*
   * Select a calendar date
   */
  function selectDate(element, year, month) {

    var day = parseInt(element.textContent, 10);

    var date = new Date(year, month, day);

    selectedDate = formatDate(date);

    /*
     * Remove previous selection
     */
    document.querySelectorAll(".day.selected").forEach(function(dayEl) {
      dayEl.classList.remove("selected");
    });

    /*
     * Highlight selected date
     */
    element.classList.add("selected");

    /*
     * Load available times
     */
    loadTimeSlots();

  }

  /*
   * Load available times into dropdown
   */
  function loadTimeSlots() {

    if (!timeSlot) return;

    timeSlot.innerHTML =
      '<option value="">Select Time</option>';

    availableTimes.forEach(function(time) {

      var option = document.createElement("option");

      option.value = time;

      option.textContent = time;

      timeSlot.appendChild(option);

    });

  }

  /*
   * Previous month
   */
  var previousMonth = document.getElementById("prevMonth");

  if (previousMonth) {

    previousMonth.addEventListener("click", function() {

      currentDate.setMonth(currentDate.getMonth() - 1);

      renderCalendar();

    });

  }

  /*
   * Next month
   */
  var nextMonth = document.getElementById("nextMonth");

  if (nextMonth) {

    nextMonth.addEventListener("click", function() {

      currentDate.setMonth(currentDate.getMonth() + 1);

      renderCalendar();

    });

  }

  /*
   * Draw calendar when page loads
   */
  renderCalendar();

}

  
});

