

<style>
.chatbot-body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.chatbot-body::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.chatbot-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #3d3d3d;
}

.pageHolder {
  height: 100vh;
  width: 100vw;
  background: #f1f1f1;
}

.chatBot-parent {
  background: #ffffff;
  width: 319px;
  height: 0vh;
  position: fixed;
  top: 53%;
  right: 20px;
  transform: translate(0%, -5%);
  border-radius: 12px;
  box-shadow: 5px 5px 25px 0 rgb(46 61 73 / 50%);
  transition: all var(--sidebar-animation-time) var(--sidebar-animation-curve);
  z-index:1;
}

.chatBot-parent.open {
  height: 47vh;
}

.chatbot-header {
  width: auto;
  background: #3d3d3d;
  height: 50px;
  text-align: center;
  position: relative;
  color: white;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  opacity: 1;
  transition: opacity var(--sidebar-animation-time) var(--sidebar-animation-curve);
}

.chatbot-header.open {
  opacity: 0;
}

.chatbot-icon {
  position: absolute;
  left: 10px;
  top: 5px;
  border-radius: 50%;
  background: white;
  border: 2px solid #8bc34a;
}

.chatbot-name {
  position: relative;
  top: 10px;
  left: -20px;
}

.online::before {
  content: "";
  position: absolute;
}

.online {
  font-size: 10px;
  right: 20px;
  position: absolute;
  top: 10px;
}

.online-animation {
  animation: blinkingText 1s infinite;
  position: absolute;
  width: 5px;
  height: 5px;
  right: -7px;
  top: 0px;
  border-radius: 50%;
  background: #8bc34a;
}

@keyframes blinkingText {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.chatbot-body {
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 0px 0px 12px 12px;
  background: #525252;
  overflow-y: auto;
}

.messages-holder {
  list-style: none;
  margin: 0px;
  padding: 0px 0px 300px 0px;
}

.bot-message,
.user-message {
  clear: both;
}

.message-holder-left,
.message-holder-right {
  padding: 8px;
  max-width: 80%;
  border-radius: 8px;
  margin: 10px;
  position: relative;
  box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.45);
}

.message-holder-left:before,
.message-holder-right:before {
  bottom: 0%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-width: 10px;
  border-radius: 7px;
}

.message-holder-left:before {
  left: 0%;
  margin-left: -10px;
  border-bottom-color: #ffffff;
}

.message-holder-right:before {
  right: 0%;
  margin-right: -10px;
  border-bottom-color: #f1f1f1;
}

.message-holder-left {
  float: left;
  background: #ffffff;
  color: #3d3d3d;
}

.messageAmimation {
  animation: 1s ease-out 0s 1 messageAnimation;
}

.message-holder-right {
  float: right;
  background: #f1f1f1;
  color: #000000;
}

.message {
  font-size: 15px;
}

.message-time {
  float: right;
  font-size: 11px;
  color: #949494;
}
.input {
  opacity: 1;
}
.input.open{
  opacity: 0;
}

.input-block {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.user-input {
  box-sizing: border-box;
  width: 100%;
  padding: 25px;
  position: relative;
  border: 1px solid #dbe2e8;
  color: #2e3d49;
  max-width: 50rem;
  outline: none;
  height: 30px;
  font-size: 0.9rem;
  border-radius: 8px;
  display: block;
  -webkit-box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
}

.send-message-icon {
  position: relative;
}
.send-icon {
  position: absolute;
  z-index: 2;
  right: 14px;
  top: 5px;
  background: #3d3d3d;
  border-radius: 50%;
  cursor: pointer;
  padding: 2px;
}

.send-icon:hover {
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.5);
}

@keyframes messageAnimation {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.loading-dots {
  text-align: center;
  z-index: 5;
}

.dot {
  opacity: 0;
  animation: showHideDot 2.5s ease-in-out infinite;
}

.one {
  animation-delay: 0.2s;
}

.two {
  animation-delay: 0.4s;
}

.three {
  animation-delay: 0.6s;
}

@keyframes showHideDot {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.button {
  display: block;
  position: relative;
  margin: 10px 4px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.btnBlueGreen.btnPush {
  box-shadow: 0px 5px 0px 0px #007144;
}
.btnPush:hover {
  margin-top: 15px;
  margin-bottom: 5px;
}

.btnBlueGreen.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #007144;
}
.btnBlueGreen {
  background: #00ae68;
  float: left;
}

.btnOrange {
  background: #ffaa40;
}
.btnOrange.btnPush {
  box-shadow: 0px 5px 0px 0px #a66615;
  float: right;
}
.btnOrange.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #a66615;
}
img.chatbot-icon {
  width: 40px;
}

.messageicon {
    width: 40px;
    top: 10px;
    position: absolute;
    right: 65px;
}

</style>




<div class="chatBot-parent open" data-message-body>
    <div class="chatbot-header">
      <img class="chatbot-icon" src="/images/Profileicon.png">
      <span class="chatbot-name">Cliente 1</span>
      <span class="online">
                    Online
                    <span class="online-animation"></span>
      </span>
    </div>
    <div class="chatbot-body" >
      <ul class="messages-holder">
        <li class="bot-message first">
          <div class="message-holder-left">
            <div class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur.
            </div>
            <div class="message-time">
              Today, 12:07 PM
            </div>
          </div>
        </li>
        <li class="user-message first">
          <div class="message-holder-right">
            <div class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur.
            </div>
            <div class="message-time">
              Today, 12:08 PM
            </div>
          </div>
        </li>
        <li class="bot-message first">
          <div class="message-holder-left">
            <div class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur.
            </div>
            <div class="message-time">
              Today, 12:08 PM
            </div>
          </div>
        </li>
        <li class="bot-message first">
          <div class="message-holder-left">
            <div class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur.
            </div>
            <div class="message-time">
              Today, 12:07 PM
            </div>
          </div>
        </li>
        <li class="user-message first">
          <div class="message-holder-right">
            <div class="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, consequuntur.
            </div>
            <div class="message-time">
              Today, 12:07 PM
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-block">
      <div class="input">
        <div class="send-message-icon">
          <img class="send-icon" src="https://png.icons8.com/color/40/000000/paper-plane.png">
        </div>
        <input class="user-input" id="user-input" placeholder="Enter Something..">
      </div>
    </div>

</div>