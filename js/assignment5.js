

$(document).ready(function () {

   // =====================================
// TASK 3: FILTER WEBSITE CONTENT
// =====================================

const movieSearch = $("#movieSearch");

if (movieSearch.length) {

    let selectedCategory = "all";

    function filterMovies() {
        const searchText = movieSearch.val().trim().toLowerCase();
        let visibleMovies = 0;

        $(".movie-list").each(function () {
            const movie = $(this);
            const movieText = movie.text().trim().toLowerCase();

            const categories = (movie.attr("data-category") || "")
                .toLowerCase()
                .split(/\s+/);

            const matchesSearch = movieText.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                categories.includes(selectedCategory);

            const isVisible = matchesSearch && matchesCategory;

            movie.prop("hidden", !isVisible);

            if (isVisible) {
                visibleMovies++;
            }
        });

        $("#movieCount").text(
            `Showing ${visibleMovies} of ${$(".movie-list").length} movies`
        );

        $("#noResults").prop("hidden", visibleMovies !== 0);
    }

    movieSearch.on("input", filterMovies);

    $(".category-btn").on("click", function () {
        selectedCategory = $(this).attr("data-category");

        $(".category-btn").removeClass("active");
        $(this).addClass("active");

        filterMovies();
    });

    filterMovies();
}

    // =====================================
    // TASK 4: MOVIE NIGHT WISHLIST
    // =====================================

    const wishlistForm = $("#wishlistForm");
    const wishlistInput = $("#wishlistInput");
    const wishlistItems = $("#wishlistItems");
    const wishlistCount = $("#wishlistCount");
    const wishlistEmpty = $("#wishlistEmpty");
    const wishlistMessage = $("#wishlistMessage");

    if (
        wishlistForm.length &&
        wishlistInput.length &&
        wishlistItems.length &&
        wishlistCount.length &&
        wishlistEmpty.length &&
        wishlistMessage.length
    ) {

        function updateWishlist() {
            const count = wishlistItems.children("li").length;

            wishlistCount.text(`Movies in your wishlist: ${count}`);
            wishlistEmpty.prop("hidden", count !== 0);
        }

        wishlistForm.on("submit", function (event) {
            event.preventDefault();

            const movieTitle = wishlistInput.val().trim();

            if (movieTitle === "") {
                wishlistMessage.text("Please enter a movie title.");
                wishlistInput.focus();
                return;
            }

            const listItem = $("<li></li>");
            const title = $("<span></span>").text(movieTitle);

            const removeButton = $("<button></button>")
                .attr("type", "button")
                .addClass("remove-movie")
                .text("Remove");

            listItem.append(title, " ", removeButton);
            wishlistItems.append(listItem);

            wishlistInput.val("");

            wishlistMessage.text(
                `${movieTitle} was added to your wishlist.`
            );

            updateWishlist();
            wishlistInput.focus();
        });

        wishlistItems.on("click", ".remove-movie", function () {
            const listItem = $(this).closest("li");
            const movieTitle = listItem.find("span").text();

            listItem.remove();

            wishlistMessage.text(
                `${movieTitle} was removed from your wishlist.`
            );

            updateWishlist();
        });

        updateWishlist();
    }


    // =====================================
    // TASK 5: VALIDATE CONTACT FORM
    // =====================================

    const contactForm = $("#contactForm");
    const formSuccess = $("#formSuccess");

    if (contactForm.length) {

        const fields = contactForm.find(
            "#contactName, #contactEmail, #contactMessage"
        );

        function validateField(field) {
            const value = field.val().trim();
            const fieldId = field.attr("id");

            let isValid = true;
            let errorMessage = "";

            if (value === "") {
                isValid = false;
                errorMessage = "This field is required.";
            }

            else if (fieldId === "contactName" && value.length < 2) {
                isValid = false;
                errorMessage = "Name must contain at least 2 characters.";
            }

            else if (fieldId === "contactEmail") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(value)) {
                    isValid = false;
                    errorMessage = "Please enter a valid email address.";
                }
            }

            else if (fieldId === "contactMessage" && value.length < 10) {
                isValid = false;
                errorMessage = "Message must contain at least 10 characters.";
            }

            const feedback = field
                .closest(".mb-3")
                .find(".invalid-feedback");

            if (isValid) {
                field.removeClass("is-invalid").addClass("is-valid");
                feedback.text("");
            } else {
                field.removeClass("is-valid").addClass("is-invalid");
                feedback.text(errorMessage);
            }

            return isValid;
        }

        // Handle form submission
        contactForm.on("submit", function (event) {
            event.preventDefault();

            formSuccess.text("");

            let formIsValid = true;

            fields.each(function () {
                const result = validateField($(this));

                if (!result) {
                    formIsValid = false;
                }
            });

            if (!formIsValid) {
                return false;
            }

            formSuccess.text(
                "Demo only: Your form has been validated successfully! No message was actually sent."
            );

            formSuccess.css("color", "#d8b4e2");

            contactForm[0].reset();
            fields.removeClass("is-valid is-invalid");

            return false;
        });

        // Validate fields again when the user edits them
        fields.on("input change", function () {
            if (contactForm.find(".is-invalid, .is-valid").length > 0) {
                validateField($(this));
            }
        });
    }

});
