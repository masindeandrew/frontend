define([
    'bean',
    'fastdom',
    'common/utils/config'
], function (
    bean,
    fastdom,
    config
) {
    return function () {
        this.id = 'VisitorFrequencyQuickSurvey';
        this.start = '2016-06-13';
        this.expiry = '2016-06-18';
        this.author = 'Kate Whalen';
        this.description = 'Add a single question survey to the submeta section of article pages';
        this.audience = 1;
        this.audienceOffset = 0;
        this.successMeasure = 'Obtain a data-set on how often users visit the Guardian';
        this.audienceCriteria = 'All users';
        this.dataLinkNames = 'impressions frequency survey';
        this.idealOutcome = '';

        this.canRun = function () {
            return config.page.contentType == 'Article';
            // check for the cookie related to this survey
        };

        function createQuickSurvey() {
            var submeta = document.getElementsByClassName('submeta')[0];
            var surveyHeading = document.createElement('div');
            var surveyBody = document.createElement('div');
            mutateSurveyHeading(surveyHeading);
            mutateSurveyBody(surveyBody);
            submeta.appendChild(surveyHeading);
            submeta.appendChild(surveyBody);
        }

        function mutateSurveyHeading(domElement) {
            domElement.className += 'impressions-survey__heading';
            domElement.style.cssText += 'color:#fff;margin-top:20px;padding: 1em 1em 1em 3em;font-size:0.8em;background-color:#AAD7E4;';
            domElement.innerHTML = '<h2 style="color:#333;font-family:"Guardian Text Sans Web","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight:bold;margin-left:-1em;">Quick Survey</h2>';
        }

        function mutateSurveyBody(domElement) {
            domElement.className += 'impressions-survey__body';
            domElement.setAttribute('data-link-name', 'impressions-frequency-survey');
            domElement.style.cssText += 'color:#fff;padding: 1em 1em 1em 3em;font-size:0.8em;background-color:#005689;';
            domElement.innerHTML = '<h3 style="font-weight:bold;margin-left:-1em;">How often do you read the Guardian in a digital format?</h3><div id="impressions-survey__select"><label><input type="radio" class="fi-survey__button" data-link-name="frequency_5" value="frequency_5">Every day/most days</label><br><label><input type="radio" class="fi-survey__button" data-link-name="frequency_4" value="frequency_4">Weekly</label><br><label><input type="radio" class="fi-survey__button" data-link-name="frequency_3" value="frequency_3">Fortnightly</label><br><label><input type="radio" class="fi-survey__button" data-link-name="frequency_2" value="frequency_2">Monthly or less</label><br><label><input type="radio" class="fi-survey__button" data-link-name="frequency_1" value="frequency_1">This is my first visit</label><br></div>';
        }

        function disableRadioButtons(buttonClassName) {
            var radioButtons = document.getElementsByClassName(buttonClassName);
            fastdom.write(function () {
                for (var i = 0; i < radioButtons.length; i++) {
                    radioButtons[i].disabled=true;
                }
            });
        }

        function handleSurveyResponse(buttonClassName) {
            var surveyQuestion = document.getElementById('impressions-survey__select');
            bean.on(surveyQuestion, 'click', function () {
                fastdom.write(function () {
                    disableRadioButtons(buttonClassName);
                    thankyouFadeIn(surveyQuestion);
                });
            });
        }

        function thankyouFadeIn(domElement) {
            fastdom.write(function () {
                domElement.style.cssText += 'visibility:hidden;opacity:0;transition:opacity 0.5s linear;';
            });
        }

        this.variants = [
            {
                id: 'variant',
                test: function () {
                    createQuickSurvey();
                    handleSurveyResponse('fi-survey__button');
                }
            },
            {
                id: 'control',
                test: function () {
                }
            }
        ];
    };
});