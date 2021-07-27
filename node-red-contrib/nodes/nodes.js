function process_input(_obj) {
    return _obj.config.datapoint;
}
function process_output(_obj) {
    if (_obj.source.config) {
        return _obj.config.datapoint + process_NodeByType(_obj.source);
    } else {
        return _obj.config.datapoint;
    }
}
function process_variable(_obj) {

    if (_obj.source.config) {
        return _obj.config.datapoint + process_NodeByType(_obj.source);
    } else {
        return _obj.config.datapoint;
    }
}
function process_constant(_obj) {
    return _obj.config.cvalue;
}
function process_operator(_obj) {
    return process_NodeByType(_obj.source.arr[0]) + " " + _obj.config.operator + " " + process_NodeByType(_obj.source.arr[1]);
}
function process_set(_obj) {
    return " = " + process_NodeByType(_obj.source) + ";";
}
function process_compare(_obj) {
    return process_NodeByType(_obj.source.arr[0]) + " == " + process_NodeByType(_obj.source.arr[1]);
}
function process_not(_obj) {
    return "!" + process_NodeByType(_obj.source);
}
function process_and(_obj) {
    var execStr = "";
    for (var i = 0; i < _obj.config.cinputs; ++i) {
        execStr += ('process_NodeByType(_obj.source.arr[' + i + ']) + " && " + ')
    }

    execStr = execStr.substring(0, execStr.length - ' + " && " + '.length);
    return eval(execStr);

    // return process_NodeByType(_obj.source.arr[0]) +" && " + process_NodeByType(_obj.source.arr[1]) +";";
    //return eval('process_NodeByType(_obj.source.arr[0]) +" && " + process_NodeByType(_obj.source.arr[1]) +";"');
}
function process_or(_obj) {
    var execStr = "";
    for (var i = 0; i < _obj.config.cinputs; ++i) {
        execStr += ('process_NodeByType(_obj.source.arr[' + i + ']) + " || " + ')
    }

    execStr = execStr.substring(0, execStr.length - ' + " || " + '.length);
    return eval(execStr);
}
function process_nand(_obj) {
    var execStr = "";
    for (var i = 0; i < _obj.config.cinputs; ++i) {
        execStr += ('process_NodeByType(_obj.source.arr[' + i + ']) + " !& " + ')
    }

    execStr = execStr.substring(0, execStr.length - ' + " !& " + '.length);
    return eval(execStr);
}
function process_nor(_obj) {
    var execStr = "";
    for (var i = 0; i < _obj.config.cinputs; ++i) {
        execStr += ('process_NodeByType(_obj.source.arr[' + i + ']) + " !| " + ')
    }

    execStr = execStr.substring(0, execStr.length - ' + " !| " + '.length);
    return eval(execStr);
}
function process_xor(_obj) {
    var execStr = "";
    for (var i = 0; i < _obj.config.cinputs; ++i) {
        execStr += ('process_NodeByType(_obj.source.arr[' + i + ']) + " ~| " + ')
    }

    execStr = execStr.substring(0, execStr.length - ' + " ~| " + '.length);
    return eval(execStr);
}
function process_cif(_obj) {
    if (_obj.source.arr[0].config) {
        var condition = eval('process_NodeByType(_obj.source.arr[0])');
        var exection = _obj.source.arr[1].ccode;

        var resStr = 'if(' + condition + '){\n' + exection + '\n}';
        return resStr;
    } else {
        var condition = eval('process_NodeByType(_obj.source.arr[1])');
        var exection = _obj.source.arr[0].ccode;

        var resStr = 'if(' + condition + '){\n' + exection + '\n}';
        return resStr;
    }
}
function process_celse(_obj) {
    // if (_obj.source.arr[0].config) {
    //     var condition = eval('process_NodeByType(_obj.source.arr[0])');
    //     var exection = _obj.source.arr[1].ccode;

    //     var resStr = 'else(' + condition + '){\n' + exection + '\n}';
    //     return resStr;
    // } else {
        // console.log(_obj)
        // var condition = eval('process_NodeByType(_obj.source.arr[1])');
        var exection = _obj.source.arr[0].ccode;

        var resStr = 'else{\n' + exection + '\n}';
        return resStr;
    // }
}
function process_celseif(_obj) {
    if (_obj.source.arr[0].config) {
        var condition = eval('process_NodeByType(_obj.source.arr[0])');
        var exection = _obj.source.arr[1].ccode;

        var resStr = 'else if(' + condition + '){\n' + exection + '\n}';
        return resStr;
    } else {
        var condition = eval('process_NodeByType(_obj.source.arr[1])');
        var exection = _obj.source.arr[0].ccode;

        var resStr = 'else if(' + condition + '){\n' + exection + '\n}';
        return resStr;
    }
}
function process_ondelay(_obj) {
    return "ondelay(" + _obj.config.datapoint + "," + _obj.config.time + ");";
}
function process_offdelay(_obj) {
    return "offdelay(" + _obj.config.datapoint + "," + _obj.config.time + ");";
}
function process_on_offdelay(_obj) {
    return "on_offdelay(" + _obj.config.datapoint + "," + _obj.config.time + ");";
}
function process_toggle(_obj) {
    return "toggle(" + _obj.config.datapoint + "," + _obj.config.datapoint1 + ");";
}
function process_pulse(_obj) {
    return "pulse(" + _obj.config.datapoint + "," + _obj.config.time + ");";
}
function process_impuls(_obj) {
    return "impuls(" + _obj.config.level + "," + _obj.config.timeon + "," + _obj.config.timeoff + ");";
}
function process_tagesuhr(_obj) {
    return 'tagesuhr("' + _obj.config.ontime + '","' + _obj.config.offtime + '");';
}
function process_wochenuhr(_obj) {
    return 'wochenuhr("' + _obj.config.ontime + '","' + _obj.config.offtime + '",' + _obj.config.onday + ',' + _obj.config.offday + ');';
}
function process_jahresuhr(_obj) {
    return 'jahresuhr("' + _obj.config.date + '","' + _obj.config.ontime + '","' + _obj.config.offtime + '",' + _obj.config.onday + ',' + _obj.config.offday + ');';
}
function process_cjoin(_obj) {
    return _obj.source;
}

function process_NodeByType(node) {
    return eval("process_" + node.config.type + "(node)");
}

module.exports = function (RED) {
    function input(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function output(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function variable(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function constant(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function operator(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == 2) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function set(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function compare(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        //var globalContext = this.context().global;
        var context = this.context();
        // context.set("left", obj.cvalue);

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);


            if (arr.length == 2) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function not(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function and(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function or(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function nand(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function nor(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function xor(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function cif(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == 2) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function celse(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == 1) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function celseif(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == 2) {
                var obj = new Object();
                obj.source = new Object();
                obj.source.arr = arr;
                obj.config = config;
                node.send(obj);

                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function ondelay(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function offdelay(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function on_offdelay(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function toggle(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function pulse(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function impuls(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function tagesuhr(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function wochenuhr(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function jahresuhr(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = new Object();
            obj.source = msg;
            obj.config = config;
            node.send(obj);
        });
    }

    function cjoin(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var context = this.context();

        this.on('input', function (msg) {
            var arr = context.get("arr");

            if (!arr) {
                arr = [];
            }

            arr.push(msg);

            if (arr.length == config.cinputs) {
                var str = "";

                function compare(a, b) {
                    if (a.cpriority < b.cpriority) {
                        return -1;
                    }
                    if (a.cpriority > b.cpriority) {
                        return 1;
                    }
                    return 0;
                }

                arr.sort(compare);

                for (var i = 0; i < config.cinputs; ++i) {
                    str += (arr[i].ccode + "\n");
                }
                var obj = new Object();
                obj.source = str;
                obj.config = config;
                node.send(obj);
                arr = [];
            }

            context.set("arr", arr);
        });
    }

    function ccode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function (msg) {
            var obj = msg;
            var res = process_NodeByType(obj);

            while (res.indexOf(";;") != -1) {
                res = res.replace(";;", ";");
            }

            var sendObj = new Object();
            sendObj.cpriority = config.cpriority;
            sendObj.ccode = res;

            node.send(sendObj);
        });
    }

    RED.nodes.registerType("input", input);
    RED.nodes.registerType("output", output);
    RED.nodes.registerType("variable", variable);
    RED.nodes.registerType("constant", constant);

    RED.nodes.registerType("operator", operator);
    RED.nodes.registerType("set", set);
    RED.nodes.registerType("compare", compare);
    RED.nodes.registerType("not", not);
    RED.nodes.registerType("and", and);
    RED.nodes.registerType("or", or);
    RED.nodes.registerType("nand", nand);
    RED.nodes.registerType("nor", nor);
    RED.nodes.registerType("xor", xor);
    RED.nodes.registerType("cif", cif);
    RED.nodes.registerType("celse", celse);
    RED.nodes.registerType("celseif", celseif);

    RED.nodes.registerType("ondelay", ondelay);
    RED.nodes.registerType("offdelay", offdelay);
    RED.nodes.registerType("on_offdelay", on_offdelay);
    RED.nodes.registerType("toggle", toggle);
    RED.nodes.registerType("pulse", pulse);
    RED.nodes.registerType("impuls", impuls);
    RED.nodes.registerType("tagesuhr", tagesuhr);
    RED.nodes.registerType("wochenuhr", wochenuhr);
    RED.nodes.registerType("jahresuhr", jahresuhr);






    RED.nodes.registerType("cjoin", cjoin);
    RED.nodes.registerType("ccode", ccode);
};