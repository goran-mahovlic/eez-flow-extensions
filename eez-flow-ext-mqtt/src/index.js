const leftPad = require('left-pad');
const mqtt = require('mqtt');

const extension = {
    eezFlowExtensionInit: (eezStudio) => {
        const {
            React,
            mobx,
            registerClass,
            makeDerivedClassInfo,
            ActionComponent
        } = eezStudio;

        ////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////

        class MqttSendActionComponent extends ActionComponent {
            static classInfo = makeDerivedClassInfo(ActionComponent.classInfo, {
                properties: [
                    {
                        name: "url",
                        type: 0 /* String */
                    },
                    {
                        name: "port",
                        type: 6 /* Number */
                    },
                    {
                        name: "user",
                        type: 0 /* String */
                    },
                    {
                        name: "password",
                        type: 0 /* String */
                    }
                ], icon: (
                    React.createElement("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 1792 1408"
                      }, React.createElement("path", {
                        d: "M1792 454v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1248V454q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48T1194 886q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38T639 759q-91-64-262-182.5T172 434q-62-42-117-115.5T0 182q0-78 41.5-130T160 0h1472q65 0 112.5 47t47.5 113z"
                      }))
                ),
                componentHeaderColor: "#FFCC66",
                enabledInComponentPalette: (projectType) => projectType === "dashboard"
            });

            constructor() {
                super();

                this.url = "wxs://test.mosquitto.org";

                mobx.observable(this);
                mobx.computed(this);
            }

            get inputs() {
                return [
                    ...super.inputs,
                    {
                        name: "topic",
                        type: 0 /* String */
                    },
                    {
                        name: "message",
                        type: 0 /* String */
                    }                    
                ];
            }

            get outputs() {
                return [
                    ...super.outputs,
                    {
                        name: "message",
                        type: 0 /* String */
                    }
                ];
            }

            async execute(runningFlow) {

                var client = mqtt.connect("url");

                const topicPropertyValue = runningFlow.getInputPropertyValue(this, "topic");
                const messagePropertyValue = runningFlow.getInputPropertyValue(this, "message");

                if (topicPropertyValue && topicPropertyValue.value != undefined) {

                    const topic = topicPropertyValue.value;
                    const message = messagePropertyValue.value;
                    client.publish(topic, message);

                    runningFlow.propagateValue(this, "Message", message);
                }

                return undefined;
            }

            getBody() {
                return React.createElement("pre", null, this.url);
            }
        }
        
        registerClass(MqttSendActionComponent);

        ////////////////////////////////////////////////////////////////////////////////
    }
};

exports.default = extension;
