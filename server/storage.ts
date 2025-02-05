import { 
  type User, type InsertUser,
  type Post, type InsertPost,
  type Comment, type InsertComment,
  type Connection, type InsertConnection,
  type Like, type InsertLike
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  
  // Posts
  getPost(id: number): Promise<Post | undefined>;
  getPosts(): Promise<Post[]>;
  getUserPosts(userId: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Comments
  getPostComments(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Connections
  getUserConnections(userId: number): Promise<Connection[]>;
  createConnection(connection: InsertConnection): Promise<Connection>;
  updateConnectionStatus(id: number, status: "accepted" | "pending"): Promise<Connection>;
  
  // Likes
  getPostLikes(postId: number): Promise<Like[]>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(userId: number, postId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private connections: Map<number, Connection>;
  private likes: Map<number, Like>;
  private currentIds: {
    users: number;
    posts: number;
    comments: number;
    connections: number;
    likes: number;
  };

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.connections = new Map();
    this.likes = new Map();
    this.currentIds = {
      users: 1,
      posts: 1,
      comments: 1,
      connections: 1,
      likes: 1
    };

    // Add mock data
    const mockUsers: InsertUser[] = [
      {
        name: "Ryan Hoffman",
        headline: "Senior Software Engineer at Tech Corp",
        bio: "Passionate about building scalable systems",
        location: "San Francisco Bay Area",
        avatar: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec",
        coverImage: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
      },
      {
        name: "Austin Distel",
        headline: "Product Manager | Tech Enthusiast",
        bio: "Building the future of work",
        location: "New York City",
        avatar: "https://images.unsplash.com/photo-1554774853-b415df9eeb92",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
      }
    ];

    mockUsers.forEach(user => this.createUser(user));
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const newUser = { 
      ...user, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, newUser);
    return newUser;
  }

  // Posts
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return Array.from(this.posts.values()).filter(post => post.userId === userId);
  }

  async createPost(post: InsertPost): Promise<Post> {
    const id = this.currentIds.posts++;
    const newPost = { 
      ...post, 
      id, 
      createdAt: new Date() 
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  // Comments
  async getPostComments(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      comment => comment.postId === postId
    );
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const id = this.currentIds.comments++;
    const newComment = { 
      ...comment, 
      id, 
      createdAt: new Date() 
    };
    this.comments.set(id, newComment);
    return newComment;
  }

  // Connections
  async getUserConnections(userId: number): Promise<Connection[]> {
    return Array.from(this.connections.values()).filter(
      conn => conn.userId === userId || conn.connectedUserId === userId
    );
  }

  async createConnection(connection: InsertConnection): Promise<Connection> {
    const id = this.currentIds.connections++;
    const newConnection = { 
      ...connection, 
      id, 
      createdAt: new Date() 
    };
    this.connections.set(id, newConnection);
    return newConnection;
  }

  async updateConnectionStatus(
    id: number,
    status: "accepted" | "pending"
  ): Promise<Connection> {
    const connection = this.connections.get(id);
    if (!connection) throw new Error("Connection not found");
    
    const updatedConnection = { ...connection, status };
    this.connections.set(id, updatedConnection);
    return updatedConnection;
  }

  // Likes
  async getPostLikes(postId: number): Promise<Like[]> {
    return Array.from(this.likes.values()).filter(like => like.postId === postId);
  }

  async createLike(like: InsertLike): Promise<Like> {
    const id = this.currentIds.likes++;
    const newLike = { 
      ...like, 
      id, 
      createdAt: new Date() 
    };
    this.likes.set(id, newLike);
    return newLike;
  }

  async deleteLike(userId: number, postId: number): Promise<void> {
    const like = Array.from(this.likes.values()).find(
      l => l.userId === userId && l.postId === postId
    );
    if (like) {
      this.likes.delete(like.id);
    }
  }
}

export const storage = new MemStorage();
