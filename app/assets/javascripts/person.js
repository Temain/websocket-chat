var person = {
    init: function() {
        var _this = this;
        var $person = $("#person");
        if(!$person.length) return;

        $person.delegate(".upload-action", "click", function(){ _this.upload_avatar(); });
        $person.delegate("#user_avatar", "change", function(){ $("#upload").submit(); });
    },

    upload_avatar: function() {
        $("#user_avatar").click();
    }
};