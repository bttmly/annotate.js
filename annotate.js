(function($) {

    $.fn.annotate = function( options ) {

        var settings = $.extend({
             jumpBack : true,
             highlight : true,
             brackets : true,
             highlightColor : "#fff09d"
        }, options);
        
        var $flags = $('[data-for-note]');
        var $footnotes = $('');
        var noteData = [];

        for ( var i = 0; i < $flags.length; i++ ) {
            noteData[i] = [];
            noteData[i][0] = $flags[i].dataset.forNote;
            noteData[i][1] = $('#' + noteData[i][0]).html();
            $footnotes = $footnotes.add(this.find('#' + noteData[i][0]));
        }
        
        for ( var l = 0; l < $footnotes.length; l++ ) {
            var m = l + 1;
            var prependStringNotes = settings.brackets ? "<span class='footnote-number'>[" + m + "]</span> " : "<span class='footnote-number'>" + m + "</span> ";
            var appendStringNotes = settings.jumpBack ?  " <a href='#flag-" + m + "'>Jump back.</a>" : ""; 
            var flagHtml = settings.brackets ? "<a href='#" + noteData[l][0] + "'>[" + m + "]</a>" : "<a href='#" + noteData[l][0] + "'>" + m + "</a>"
            $footnotes.filter('#' + noteData[l][0])
                .addClass('annotate-footnote')
                .prepend(prependStringNotes)
                .append(appendStringNotes)
                .appendTo(this);
            $flags.eq(l)
                .attr('id', 'flag-' + m)
                .addClass('annotate-flag')
                .html(flagHtml);
        }
        
        if ( settings.highlight ) {
            $('.annotate-flag').click(function() {
                var $target = $('#' + $(this).attr('data-for-note'));
                $target.css({
                    'transition' : 'background-color .2s ease',
                    'background-color': settings.highlightColor
                    });
                setTimeout(fadeAway, 500);
                function fadeAway() {
                    $target.css({
                        'transition': 'background-color 4s ease',
                    }).removeAttr('style');
                }
            });        
        }
        
        return this;
    }

}(jQuery)); 