$(document).ready(function(){
    
    (function($) {
        "use strict";

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Please input your name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                subject: {
                    required: "Please input email's subject",
                    minlength: "Your subject must consist of at least 4 characters"
                },
                email: {
                    required: "Please input your email"
                },
                message: {
                    required: "Please input your message",
                    minlength: "Your message must consist of at least 20 characters"
                }
            },
            submitHandler: function(form) {
                // var form     =
                var formData = new FormData(form);
                formData.append('company',company_code);
                formData.append('send_to',contact_info.email);
                $.ajax({
                    url:base_url + "/send-email",
                    data:formData,
                    type: "POST",
                    dataType: "JSON",
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if(data.status == 'success') {
                            $('#contactForm')[0].reset();
                            swal("Success!", data.message, "success");
                        }
                        else {
                            swal("Failed!", data.message, "error");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        })
    })
        
 })(jQuery)
})