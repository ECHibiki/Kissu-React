// Provides the logic for all template generation and startup messages
import { Request, Response } from "express";
import {SettingsBridge} from "./bridges/server-settings-bridge";
import {JSONBridge} from "./bridges/json-bridge";
import {Model} from "../../model/model";
import {View} from "../view";
import {JSRenderer} from "./js-renderer";


export class Templater {
  settings_bridge:SettingsBridge;
  json_bridge:JSONBridge;
  js_renderer:JSRenderer;
  constructor(model:Model){
    this.settings_bridge = new SettingsBridge(model);
    this.json_bridge = new JSONBridge(model);
    this.js_renderer = new JSRenderer();
  }

  getStartUpText(port:number):string{
    return (this.settings_bridge.getStartUpMessage())(port, new Date().toString());
  }

  renderView(template_fn:(...args:string[])=>string, route:string, board:string):(req:Request, res:Response)=>void{
    return this.json_bridge.getJSONProperties(this.buildSendRequest, template_fn, route, board);
    //(req:Request, res:Response) => res.send(template_fn(, "b", "c"));
  }

  buildSendRequest(properties:any, template_fn:(...args:string[])=>string, route:string, board:string):
    (req:Request, res:Response)=>void {
      var board_title:string = properties["title"];
      var react_body:string = this.js_renderer.renderReact();
      return (req:Request, res:Response) => res.send(
        template_fn(
          board_title,
          board,
          react_body
        ));
  }

}
