// app.js
new Vue({
    el: '#app',
    data() {
        return {
            isHelloWorldVisible: false
        };
    },
    methods: {
        showHelloWorld() {
            this.isHelloWorldVisible = !this.isHelloWorldVisible;
        }
    }
});
