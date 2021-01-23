<template>
    <div>
        <Navigation />
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
</template>

<script>
import Navigation from '../components/nav/Nav'
import router from '../router'
export default {
    components: {
    Navigation,
  },
  data(){
      return {
        file: ''
      }
    },
  methods: {
        submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            this.$axios.post( 'http://10.176.34.161:8001/api/userManagement/user/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(resp=>{
                console.log('SUCCESS!!');
                console.log(resp.data)
            })
            .catch(function(){
                console.log('FAILURE!!');
            });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
  }

}
</script>

<style>

</style>