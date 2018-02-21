
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  TextInput,
} from 'react-native';

import PropTypes, { array } from 'prop-types';
import Dialogflow from "react-native-dialogflow";
import  {Button,Icon} from "native-base";


class App extends Component {
    
    constructor(props)
    {
        super(props);
 
        this.state = {
              listeningState: "not started",
              audioLevel: 0,
              isscrollToEnd: false,
              textmsg:"",
              messages: [
                  {
                      query: "",
                      answer: "",
                      commands:[]
                  }
              ]
          };

        const apikey=props.apikey;
    
        Dialogflow.setConfiguration(
             '492a281b4eb64b8cbc326a5ac84d1cbe',Dialogflow.LANG_ENGLISH_GB
          );
    
         

          // Hide that keyboard!
          Keyboard.dismiss();
    }


    GetAPIResponse = () =>{
        Dialogflow.onListeningStarted(() => {
            this.setState({listeningState: "started"});
        });
          
        Dialogflow.onListeningCanceled(() => {
            this.setState({listeningState: "canceled"});
        });
          
        Dialogflow.onListeningFinished(() => {
            this.setState({listeningState: "finished"});
        }); 
          
        Dialogflow.onAudioLevel(level => {
            this.setState({audioLevel: level});
        });
          
        Dialogflow.startListening(results => {
            console.log(results);
            var sysReply="";
           
            var replies=new Array();
            var commands="";
      
            if(results!= null && results.result != null && results.result.fulfillment != null )
            {
                sysReply="Please try again!";
            }
            else
            {
               console.log("Hi");
      
               
                
            }
           
            
          
            this.setState({
                isscrollToEnd: true,
                messages: [...this.state.messages,{
                query:results.result.resolvedQuery,
                answer: sysReply,
              
                commands:replies
                }]
            });
        }, error => {
            var errorTxt="Could not get you, Can you please say again";
       
            this.setState({
                isscrollToEnd: true,
                messages:  [...this.state.messages,
                    {
                        query:"?",
                        answer: errorTxt +"!",
                        commands:[]
                    }]
                });
        });
    }

    GetAPIRespForComd = (s,_this) => {
        if(s != "")
        {  
        Dialogflow.requestQuery((s), 
        results=>{
            console.log(results);
            var sysReply="";
            var replies=new Array();
            var commands="";
      
          

            // Hide that keyboard!
            Keyboard.dismiss();
            this.state.textmsg="";
           
            
          
            _this.setState({
                isscrollToEnd: true,
                messages: [..._this.state.messages,{
                query:results.result.resolvedQuery,
                answer: sysReply,
                commands:replies
                }]
            });
        }, error => {
            var errorTxt="Could not get you, Can you please say again";
          
            _this.setState({
                isscrollToEnd: true,
                messages:  [..._this.state.messages,
                    {
                        query:"?",
                        answer: errorTxt +"!",
                        commands:[]
                    }]
                });
        });                                                   
    }}

    onChangeText =(value) => {
        this.setState({
            textmsg:value
        });
    }

    doNothing =() =>{
        //alert("please add text");
    }

    render(){
        var _this = this;

        return(
        <View style={styles.container}>

            <ScrollView 
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: this.state.isscrollToEnd});
            }}> 
            {
                        this.state.messages.map(function(result,i){
                            const query=result.query;
                            const answer=result.answer;
                           
                            return ( 
                            <View>
                                {(query !== "")?(
                                    <View style={{flex:1, flexDirection: 'row',padding: 10}}>
                                        <View style={styles.personcircle}>
                                            <Icon name="ios-person" size={40} color="#ffffff" ></Icon>
                                        </View>
                                        <View>
                                            <Text>{" "}</Text>
                                        </View>
                                        <View style={styles.query}>
                                            <Text numberOfLines= {3} ellipsizeMode='tail' style={styles.inputtext}>{query}</Text>
                                        </View>
                                    </View>
                                ):(<View></View>)}
                        
                                {(answer !== "")?(                 
                                    <View style={{flex:1,flexDirection: 'row',justifyContent:'flex-end', alignSelf: 'center',padding: 10}}>
                                        <View style={styles.answer}>
                                            <Text style={styles.inputtext}>{answer}</Text>
                                        </View>    
                                        <View >
                                            <Text>{" "}</Text>
                                        </View>
                                          <View style={styles.systemcircle}>
                                            <Icon name="logo-android" size={40} color="#ffffff" ></Icon>
                                        </View>
                                    </View>
                                ):(<View></View>)}

                           


                            </View> 
                            );
                        })
                    }
            </ScrollView> 

            {(this.state.messages !=null && this.state.messages.length > 0)?(
           
                <View style={styles.footersection}>
                    <TextInput 
                        style={styles.nameinput}
                        placeholder= "Send messages"
						alignSelf='center'
                        value={this.state.textmsg}
                        onChangeText={(value) => this.onChangeText(value)}
                    ></TextInput>
                    <Button dark>
                       <Icon 
                            name="send" 
                            size={30} 
                            color="#ffffff" 
                            onPress={() => (this.state.textmsg !="") ? 
                            this.GetAPIRespForComd(this.state.textmsg,this): this.doNothing()}
                            />    
                    </Button>
                </View>)             
         
            :(<View></View>)}
            </View>
        ); 
    }
}





const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 20,
  },
  inputtext:{
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    color: "#000000",   
  },
 
  iconstyle:
  {
   width: 40,
   height: 40,
   borderRadius: 40/2,
   justifyContent:'center',
   alignItems: 'center',
   borderWidth: 1,
   borderColor: '#000',
   margin:2,
  },
  personcircle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#000',
},
systemcircle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#000',
},
query:{flex:1, flexDirection: 'column', alignSelf: 'flex-start', backgroundColor: '#ffffff', borderColor: '#000000', borderRadius: 20},
answer:{flex:1,flexDirection: 'column', justifyContent:'flex-end',alignSelf: 'flex-start', marginLeft:20, backgroundColor: '#ffffff',borderColor: '#000000',borderRadius: 20},
commands:{
    flexDirection: 'column',
    justifyContent:'space-around', 
    alignSelf: 'center',
},
commandstyle:
{
 width: 250,
 height: 20,
 borderRadius: 20,
 backgroundColor: 'rgba(9, 206, 209, 0.46)',
 justifyContent:'center',
 alignItems: 'center',
 borderWidth: 1,
 borderColor: '#000',
 margin:2,
},
nameinput : {
    height: 40,
    borderWidth: 0,
    borderColor: '#0000FF',
    margin: 1,
    width: 220,
},
footersection:{flexDirection:'row', borderWidth: 1,backgroundColor:'#ffffff',borderColor:'#000000', borderRadius:5,alignSelf:'center'}
});

export default  App;