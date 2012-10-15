enyo.kind({
  name: "QuestionsPullout",
  tag: null,
  components: [
    {
      name: "pullouttoolbar",
      kind: "sugardave.PulloutToolbar",
      classes: "questions-pullout",
      edge: "right",
      pulltabPosition: -1,
      autoDismiss: false,
      components: [
        {
          content: 'Ask a Question:'
        },
        {
          kind: 'onyx.InputDecorator',
          classes: 'name-decorator',
          components: [
            {
              name: 'nameInput',
              kind: 'Input',
              placeholder: 'Please Enter Your Name'
            }
          ]
        },
        {
          kind: 'onyx.InputDecorator',
          components: [
            {
              name: 'questionInput',
              kind: 'TextArea',
              style: 'height: 8em;',
              placeholder: 'Enter Your Question Here'
            }
          ]
        },
        {
          name: 'submitQuestionButton',
          kind: 'onyx.Button',
          classes: 'onyx-blue',
          content: 'Submit Question',
          onclick: 'submitQuestion'
        }
      ]
    }
  ],

  socket: null,

  create: function(){
    this.inherited(arguments);

    this.socket = new Socket({
      address: window.location.protocol + '//' + window.location.hostname + ':2233',
      init: {
        on: {
          updateQuestions: enyo.bind(this, 'doQuestionReceived')
        }
      }
    });
  },

  rendered: function(){
    this.inherited(arguments);
    this.$.pullouttoolbar.show();
    // need to let the DOM nodes render before collapsing the toolbar
    setTimeout(enyo.bind(this.$.pullouttoolbar, "collapse", 0));
  },

  submitQuestion: function(){
    var name = this.$.nameInput.getValue().trim();
    var question = this.$.questionInput.getValue().trim();
    if(name && question){
      this.socket.emit('newQuestion', {
        name: name,
        question: question
      });
      this.$.nameInput.setValue('');
      this.$.questionInput.setValue('');
    }
  },

  events: {
    onQuestionReceived: ""
  }

});
