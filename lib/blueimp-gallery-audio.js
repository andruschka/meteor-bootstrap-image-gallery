/*
 * blueimp Gallery Audio Factory JS 1.1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // The class for audio content elements:
        audioContentClass: 'audio-content',
        // The class for audio when it is loading:
        audioLoadingClass: 'audio-loading',
        // The class for audio when it is playing:
        audioPlayingClass: 'audio-playing',
        // The list object property (or data attribute) for the audio poster URL:
        audioPosterProperty: 'poster',
        // The list object property (or data attribute) for the audio sources array:
        audioSourcesProperty: 'sources'
    });

    Gallery.prototype.audioFactory = function (obj, callback, audioInterface) {
        var that = this,
            options = this.options,
            audioContainerNode = this.elementPrototype.cloneNode(false),
            audioContainer = $(audioContainerNode),
            errorArgs = [{
                type: 'error',
                target: audioContainerNode
            }],
            audio = audioInterface || document.createElement('audio'),
            url = this.getItemProperty(obj, options.urlProperty),
            type = this.getItemProperty(obj, options.typeProperty),
            title = this.getItemProperty(obj, options.titleProperty),
            posterUrl = this.getItemProperty(obj, options.audioPosterProperty),
            posterImage,
            sources = this.getItemProperty(
                obj,
                options.audioSourcesProperty
            ),
            source,
            playMediaControl,
            isLoading,
            hasControls;
        audioContainer.addClass(options.audioContentClass);
        if (title) {
            audioContainerNode.title = title;
        }
        if (audio.canPlayType) {
            if (url && type && audio.canPlayType(type)) {
                audio.src = url;
            } else {
                while (sources && sources.length) {
                    source = sources.shift();
                    url = this.getItemProperty(source, options.urlProperty);
                    type = this.getItemProperty(source, options.typeProperty);
                    if (url && type && audio.canPlayType(type)) {
                        audio.src = url;
                        break;
                    }
                }
            }
        }
        if (posterUrl) {
            audio.poster = posterUrl;
            posterImage = this.imagePrototype.cloneNode(false);
            $(posterImage).addClass(options.toggleClass);
            posterImage.src = posterUrl;
            posterImage.draggable = false;
            audioContainerNode.appendChild(posterImage);
        }
        playMediaControl = document.createElement('a');
        playMediaControl.setAttribute('target', '_blank');
        if (!audioInterface) {
            playMediaControl.setAttribute('download', title);
        }
        playMediaControl.href = url;
        if (audio.src) {
            audio.controls = true;
            (audioInterface || $(audio))
                .on('error', function () {
                    that.setTimeout(callback, errorArgs);
                })
                .on('pause', function () {
                    isLoading = false;
                    audioContainer
                        .removeClass(that.options.audioLoadingClass)
                        .removeClass(that.options.audioPlayingClass);
                    if (hasControls) {
                        that.container.addClass(that.options.controlsClass);
                    }
                    if (that.interval) {
                        that.play();
                    }
                })
                .on('playing', function () {
                    isLoading = false;
                    audioContainer
                        .removeClass(that.options.audioLoadingClass)
                        .addClass(that.options.audioPlayingClass);
                    if (that.container.hasClass(that.options.controlsClass)) {
                        hasControls = true;
                        that.container.removeClass(that.options.controlsClass);
                    } else {
                        hasControls = false;
                    }
                })
                .on('play', function () {
                    window.clearTimeout(that.timeout);
                    isLoading = true;
                    audioContainer.addClass(that.options.audioLoadingClass);
                });
            $(playMediaControl).on('click', function (event) {
                that.preventDefault(event);
                if (isLoading) {
                    audio.pause();
                } else {
                    audio.play();
                }
            });
            audioContainerNode.appendChild(
                (audioInterface && audioInterface.element) || audio
            );
        }
        audioContainerNode.appendChild(playMediaControl);
        this.setTimeout(callback, [{
            type: 'load',
            target: audioContainerNode
        }]);
        return audioContainerNode;
    };

    return Gallery;
}));