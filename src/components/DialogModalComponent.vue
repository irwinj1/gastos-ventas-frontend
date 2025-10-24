<template>
    <v-dialog v-model="props.dialog" width="auto" persistent>
    <v-card :prepend-icon="prependIcon" class="text-center" :title="props.titulo" width="700" rounded="xl">
     <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-center">
                <span>{{ props.message }}</span>
            </v-col>
            <v-col cols="12" class="text-center"> 
                <span>{{ props.subMessage }}</span>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="align-center justify-center">
          <v-btn
            text="Cancelar"
            variant="outlined"
            rounded="lg"
            class="text-none"
            @click="closeDialog"
          />
          <v-btn
            color="grey-darken-4"
            text="Guardar"
            variant="elevated"
            rounded="lg"
            @click="guardar"
            class="text-none"
           
          />
        </v-card-actions>
     
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const props = defineProps({
    dialog:{
        type:Boolean,
        default:false
    },
    titulo:{
        type:String
    },
    prependIcon:{
        type:String
    },
    message:{
        type:String
    },
    subMessage:{
        type:String
    },
    eliminarCliente:{
        type:Boolean,
        default:false
    }
})

const emit= defineEmits(['closeDialog','aceptarEvento'])

const closeDialog = ()=>{
    try {
        emit('closeDialog');
    } catch (error) {
        
    }
}
const guardar = ()=>{
  emit('aceptarEvento')
}
</script>