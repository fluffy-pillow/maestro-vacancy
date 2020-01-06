<template>
  <div class="hello">
    <h1>The streamer</h1>
    <div ref="localVideo" style="width:320px;height:240px;border: 1px solid"></div>
    <input type="button" value="start" @click="start()"/>
    <input type="button" value="stop" @click="stop()"/>
    <p id="status"></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
      return {
          localVideo: null,
          stream: null
      }
  },
  methods: {
      start () {
          Flashphoner.createSession({urlServer: "wss://wcs5-eu.flashphoner.com:8443"}).on(Flashphoner.constants.SESSION_STATUS.ESTABLISHED,  (session) => {
              //session connected, start streaming
              this.startStreaming(session);
          }).on(Flashphoner.constants.SESSION_STATUS.DISCONNECTED, () => {
              console.log("DISCONNECTED");
          }).on(Flashphoner.constants.SESSION_STATUS.FAILED, () => {
              console.log("FAILED");
          });
      },
      stop () {
          this.stream.stop();
          console.log(this.stream)
      },
      startStreaming(session) {

          this.stream = session.createStream({
              name: "stream222",
              display: this.localVideo,
              cacheLocalResources: true,
              receiveVideo: false,
              receiveAudio: false,
              record: true
          });

          this.stream.on(Flashphoner.constants.STREAM_STATUS.PUBLISHING, (publishStream) => {
              console.log(Flashphoner.constants.STREAM_STATUS.PUBLISHING);
          }).on(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED, (stream) => {
              console.log(Flashphoner.constants.STREAM_STATUS.UNPUBLISHED + " " + stream.getRecordInfo());
          }).on(Flashphoner.constants.STREAM_STATUS.FAILED, ()=> {
              console.log(Flashphoner.constants.STREAM_STATUS.FAILED);
          });

          this.stream.publish();
      }
  },
  mounted () {
      Flashphoner.init();
      this.localVideo = this.$refs.localVideo
  }

}
</script>

<style scoped>

</style>
