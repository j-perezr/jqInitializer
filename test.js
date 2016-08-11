let bower = require("bower");
bower.commands.search("moment").on("end",function(){debugger});
bower.commands.install(["moment"]).on("end",function(){debugger});
bower.commands.install(["d3"]).on("end",function(){debugger});