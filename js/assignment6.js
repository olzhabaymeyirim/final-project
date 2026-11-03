

$(document).ready(function () {

    // TASK 1: Personalized Welcome

    $("#welcomeName").on("input", function () {
        const name = $(this).val().trim();

        if (name === "") {
            $(this).addClass("input-error");
            $("#welcomeMessage").text("Please enter your name.");
        } else {
            $(this).removeClass("input-error");
            $("#welcomeMessage").text(
                "Hello, " + name + "! Click Say Hello to continue."
            );
        }
    });

    $("#welcomeButton").on("click", function () {
        const name = $("#welcomeName").val().trim();

        if (name === "") {
            $("#welcomeName").addClass("input-error");
            $("#welcomeMessage").text("Please enter your name first.");
            $("#welcomeName").focus();
            return;
        }

        $("#welcomeName").removeClass("input-error");
        $("#welcomeMessage").text(
            "Welcome to Moon & Movies, " + name +
            "! Enjoy your movie night under the stars."
        );
    });


    // TASK 1: Light / Dark Theme

    const savedTheme = localStorage.getItem("moonTheme");

    $("body").toggleClass("light-theme", savedTheme === "light");

    function updateThemeButton() {
        const isLight = $("body").hasClass("light-theme");

        $("#themeButton")
            .html(isLight ? "&#x263E;&#xFE0E;" : "&#x2600;&#xFE0E;")
            .attr("aria-label", isLight
                ? "Switch to dark theme"
                : "Switch to light theme")
            .attr("title", isLight
                ? "Switch to dark theme"
                : "Switch to light theme");
    }

    $("#themeButton").on("click", function () {
        $("body").toggleClass("light-theme");

        const currentTheme = $("body").hasClass("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("moonTheme", currentTheme);

        updateThemeButton();
    });

    updateThemeButton();


    // TASK 2: FAQ Accordion

    $(".faq-section .faq-question").on("click", function () {
        const question = $(this);
        const answerId = question.attr("aria-controls");
        const answer = $("#" + answerId);

        if (!answer.length) return;

        // Stop previous animation
        answer.stop(true, true);

        const isExpanded =
            question.attr("aria-expanded") === "true";

        if (isExpanded) {
            question.attr("aria-expanded", "false");

            answer.slideUp(300, function () {
                answer.prop("hidden", true);
            });

        } else {
            answer.prop("hidden", false);
            question.attr("aria-expanded", "true");

            answer.hide().slideDown(300);
        }
    });


    // TASK 2: Fade Effect

    $("#faqInfoButton").on("click", function () {
        const status = $("#faqStatus");

        status.stop(true, true);

        if (!status.prop("hidden")) {
            status.fadeOut(400, function () {
                status.prop("hidden", true);
            });

        } else {
            status.prop("hidden", false);
            status.hide().fadeIn(400);
        }
    });

});
