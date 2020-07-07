<template>
    <div class="console fill">
        <div class="output-container fill">
            <div class="message-box fill" ref="box">
                <div class="message-box-content">
                    <template v-for="(message, i) in messages">
                        <span 
                            v-if="message.type == 'system'"
                            class="output system"  
                            :key="i"
                        >{{message.body}}</span>
                        <span 
                            v-if="message.type == 'output'"
                            class="output"  
                            :class="{'error': message.outputType == 'stderr'}"
                            :key="i"
                        >{{message.body}}</span>
                    </template>
                </div>
            </div>
            <div class="input-row-box">
                <div class="input-row-inner-box fill">
                    <div class="input-box fill" :class="{ 'disabled': !inputMode }">
                        <input ref="textInput" class="input fill" type="text" :disabled="!inputMode" v-on:keyup.13="sendText" v-model="inputText"></input>
                    </div>
                    <button class="send-button" :disabled="!inputMode" @click="sendText">
                        보내기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'console',
    props: [
        'staticUrl',
        'agents',
        'messages',
        'inputMode'
    ],
    data() {
        return {
            inputText: '',
        }
    },
    mounted() {
        
    },
    methods: {
        sendText() {
            const text = this.inputText
            this.inputText = ''
            this.$emit('send-text', text)
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const box = this.$refs.box
                box.scrollTo(0, box.scrollHeight);
            })
        },
    },
    watch: {
        inputMode() {
            if (this.inputMode === 'text') {
                this.$nextTick(() => {
                    this.$refs.textInput.focus()
                })
            }
        },
        messages() {
            this.scrollToBottom()
        },
    },
}
</script>
<style scoped>
    .console {
        background-color: #222;
        color: #fff;
    }
    .fill {
        width: 100%;
        height: 100%;
    }
    .output-container {
        position: relative;
        margin: 0 auto;
        max-width: 50rem;  
        padding-bottom: 3rem; 
    }
    .message-box {
        overflow-y: scroll;
    }
    .message-box-content {
        padding: 1rem 1rem;
    }
    .output {
        display: inline;
        padding: 0;
        margin: 0;
        font-family: monospace;
        white-space: pre-wrap;
        word-break: break-all;
    }
    .error {
        color: #ff4444;
    }
    .system {
        color: #1dbcd1;
    }
    .input-row-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        /* padding: 0.4rem; */
    }
    .input-row-inner-box {
        position: relative;
        background-color: #fff;
        padding-right: 5rem;
    }
    .input-box {
        padding: 0.5rem;
    }
    .input-box.disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
    .input {
        border: 0;
        outline: 0;;
        line-height: 2rem;
        font-size: 1rem;
    }
    .input:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
    .send-button {
        border: 0;
        background-color: #2B73F5;
        position: absolute;
        top: 0;
        right: 0;
        width: 5rem;
        height: 100%;
        color: #fff;
        font-size: 1rem;
        outline: 0;
        cursor: pointer;
    }
    .send-button:hover {
        opacity: 0.8;
    }
    .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>