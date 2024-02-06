import express from "express";

export interface LoginInput {
  email: string;
  password: string;
}
export interface IUserRequest extends express.Request {
  user: any;
}
