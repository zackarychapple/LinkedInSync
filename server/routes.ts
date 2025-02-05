import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPostSchema, insertCommentSchema, insertConnectionSchema, insertLikeSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // Users
  app.get("/api/users", async (req, res) => {
    const users = await storage.getUsers();
    res.json(users);
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    const user = await storage.createUser(parsed.data);
    res.status(201).json(user);
  });

  // Posts
  app.get("/api/posts", async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get("/api/users/:userId/posts", async (req, res) => {
    const posts = await storage.getUserPosts(parseInt(req.params.userId));
    res.json(posts);
  });

  app.post("/api/posts", async (req, res) => {
    const parsed = insertPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid post data" });
    }
    const post = await storage.createPost(parsed.data);
    res.status(201).json(post);
  });

  // Comments
  app.get("/api/posts/:postId/comments", async (req, res) => {
    const comments = await storage.getPostComments(parseInt(req.params.postId));
    res.json(comments);
  });

  app.post("/api/comments", async (req, res) => {
    const parsed = insertCommentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid comment data" });
    }
    const comment = await storage.createComment(parsed.data);
    res.status(201).json(comment);
  });

  // Connections
  app.get("/api/users/:userId/connections", async (req, res) => {
    const connections = await storage.getUserConnections(parseInt(req.params.userId));
    res.json(connections);
  });

  app.post("/api/connections", async (req, res) => {
    const parsed = insertConnectionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid connection data" });
    }
    const connection = await storage.createConnection(parsed.data);
    res.status(201).json(connection);
  });

  app.patch("/api/connections/:id", async (req, res) => {
    const { status } = req.body;
    if (status !== "accepted" && status !== "pending") {
      return res.status(400).json({ message: "Invalid status" });
    }
    const connection = await storage.updateConnectionStatus(parseInt(req.params.id), status);
    res.json(connection);
  });

  // Likes
  app.get("/api/posts/:postId/likes", async (req, res) => {
    const likes = await storage.getPostLikes(parseInt(req.params.postId));
    res.json(likes);
  });

  app.post("/api/likes", async (req, res) => {
    const parsed = insertLikeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid like data" });
    }
    const like = await storage.createLike(parsed.data);
    res.status(201).json(like);
  });

  app.delete("/api/likes", async (req, res) => {
    const { userId, postId } = req.body;
    await storage.deleteLike(userId, postId);
    res.status(204).send();
  });

  return httpServer;
}
