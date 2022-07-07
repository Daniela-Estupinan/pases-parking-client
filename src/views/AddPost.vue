<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5" color="purple lighten-5">
                    <v-card-title >
                        Add New User
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                    <v-text-field label="Name" v-model="item.name" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                    <v-text-field label="Type" v-model="item.type" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>                    
                    <v-text-field label="Numero de pases" v-model="item.pases" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>     
                    <v-text-field label="Fecha de compra" v-model="item.date" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>     
                    <v-btn type="submit" class="mt-3" color="deep-purple accent-1">Add User</v-btn>      
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import API from "../api.js"
export default{
    data(){
        return{
            rules:[(value)=> !!value || "*This field is required*"],
            item:{
                name:"",
                type:"",
                pases:"",
                date:"",
            },
            
        };
    },
    methods:{
       
        async submitForm(){
                 
             const formData = new FormData();
            formData.append('name', this.item.name);
           formData.append('type', this.item.type);
           formData.append('pases', this.item.pases);
           formData.append('date', this.item.date);
           if(this.$refs.form.validate()){
               const response = await API.addPost(formData);
               this.$router.push({
                   name: 'home',
                   params: {message: response.message}

               });
           }      
      }

        },

};

</script>
