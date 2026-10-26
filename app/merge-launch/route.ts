export function GET(request: Request) {
    const destination = new URL(request.url);
    destination.pathname = '/merge-launch/index.html';
    return Response.redirect(destination, 307);
}
